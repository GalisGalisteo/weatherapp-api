import { weatherApiKey } from "../config/constants.js";
import { WeatherData } from "../types/weatherInterfaces.js";

/**
 * Get weather data from external API.
 *
 * @param {number} lon - The longitude of the location.
 * @param {number} lat - The latitude of the location.
 * @returns {Promise<Object>} The weather data.
 */

export const getWeather = async (
  lon: string,
  lat: string
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching weather: ${response.status} ${response.statusText}`
      );
    }
    return (await response.json()) as WeatherData;
  } catch (error) {
    console.error(`Error fetching weather: ${(error as Error).message}`);
    throw new Error("ErrorFetchingWeather");
  }
};
