jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("config/constants", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  it("should use default values if environment variables are not set", () => {
    const { port, mongoUri, weatherApiKey } = require("../config/constants");

    expect(port).toBe(3000);
    expect(mongoUri).toBe("mongodb://localhost:27017/weatherapp");
    expect(weatherApiKey).toBeUndefined();
  });

  it("should use environment variables if they are set", () => {
    process.env.PORT = "4000";
    process.env.MONGO_URI = "mongodb://test:test@localhost:27017/testdb";
    process.env.WEATHER_API_KEY = "testapikey";

    const { port, mongoUri, weatherApiKey } = require("../config/constants");

    expect(port).toBe("4000");
    expect(mongoUri).toBe("mongodb://test:test@localhost:27017/testdb");
    expect(weatherApiKey).toBe("testapikey");
  });
});
