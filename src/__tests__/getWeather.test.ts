import { getWeather } from "../utils/getWeather";
import { weatherApiKey } from "../config/constants";
import { mockWeatherData } from "./dataForTests";

global.fetch = jest.fn();

describe("getWeather", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should return weather data when fetch is successful", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const lon = "-122.4194";
    const lat = "37.7749";

    const result = await getWeather(lon, lat);

    expect(fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`
    );
    expect(result).toEqual(mockWeatherData);
  });

  it("should throw an error when fetch response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const lon = "-122.4194";
    const lat = "37.7749";

    await expect(getWeather(lon, lat)).rejects.toThrow("ErrorFetchingWeather");
  });

  it("should throw an error when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const lon = "-122.4194";
    const lat = "37.7749";

    await expect(getWeather(lon, lat)).rejects.toThrow("ErrorFetchingWeather");
  });
});
