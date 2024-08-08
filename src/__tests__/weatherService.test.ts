import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { getLocationWeather } from "../services/weatherService";
import { Location } from "../models/location";
import { UserWeatherRecord } from "../models/userWeatherRecord";
import { getWeather } from "../utils/getWeather";
import { mockLocationData, mockWeatherData } from "./mockData";

jest.mock("../utils/getWeather");

describe("getLocationWeather", () => {
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

  it("should return weather data and nearest locations", async () => {
    await Location.create(mockLocationData);

    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    const result = await getLocationWeather({ lon: 0, lat: 0 });

    expect(result.locations.length).toBeGreaterThan(0);
    expect(result.weather).toHaveProperty("current");
    expect(result.weather.current).toHaveProperty("temp", 28.07);
    expect(result.weather.current.weather[0]).toMatchObject({
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const userWeatherRecords = await UserWeatherRecord.find({});
    expect(userWeatherRecords.length).toBe(1);
    expect(userWeatherRecords[0]).toHaveProperty("temp", 28.07);
  });

  it("should throw InvalidLocationData for invalid coordinates", async () => {
    await expect(getLocationWeather({ lon: 200, lat: 0 })).rejects.toThrow(
      "InvalidLocationData"
    );
  });

  it("should throw NoLocationsFound when no locations are found", async () => {
    await expect(getLocationWeather({ lon: 0, lat: 0 })).rejects.toThrow(
      "ErrorFindingLocations"
    );
  });

  it("should throw ErrorFindingLocations when external API fails", async () => {
    await Location.create(mockLocationData);

    (getWeather as jest.Mock).mockRejectedValue(
      new Error("External API Error")
    );

    await expect(getLocationWeather({ lon: 0, lat: 0 })).rejects.toThrow(
      "ErrorFindingLocations"
    );
  });
});
