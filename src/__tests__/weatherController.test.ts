import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import { Location } from "../models/location";
import { UserWeatherRecord } from "../models/userWeatherRecord";
import { getWeather } from "../utils/getWeather";
import { mockWeatherData } from "./mockData";

jest.mock("../utils/getWeather");

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  await Location.createIndexes();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Location.deleteMany({});
  await UserWeatherRecord.deleteMany({});
  (getWeather as jest.Mock).mockClear();
});

describe("GET /weather", () => {
  it("should return weather data and nearest locations", async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    await Location.create({
      id: 1,
      city: "Test City",
      country: "Test Country",
      iso2: "TC",
      iso3: "TST",
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
      cityAscii: "TestCity",
    });

    const response = await request(app)
      .get("/weather")
      .query({ lon: 0, lat: 0 })
      .expect(200);

    expect(response.body).toHaveProperty("locations");
    expect(response.body).toHaveProperty("weather");
    expect(response.body.locations.length).toBeGreaterThan(0);
    expect(response.body.weather).toHaveProperty("current");
    expect(response.body.weather.current).toHaveProperty("temp", 28.07);
    expect(response.body.weather.current.weather[0]).toMatchObject({
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    });
    expect(getWeather).toHaveBeenCalledTimes(1);
  });

  it("should return 400 for invalid location data", async () => {
    const response = await request(app)
      .get("/weather")
      .query({ lon: "invalid", lat: "invalid" })
      .expect(400);

    expect(response.body).toHaveProperty("error", "Invalid input data");
  });

  it("should handle no locations found", async () => {
    const response = await request(app)
      .get("/weather")
      .query({ lon: 0, lat: 0 })
      .expect(404);

    expect(response.body).toHaveProperty("error", "Unable to find locations");
  });
});
