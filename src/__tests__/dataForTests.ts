import { ILocation } from "../types/locationInterfaces";
import { WeatherData } from "../types/weatherInterfaces";

export const mockLocationData: ILocation = {
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
};

export const mockWeatherData: WeatherData = {
  lat: 37.2939,
  lon: -7.3409,
  timezone: "Europe/Madrid",
  timezone_offset: 7200,
  current: {
    dt: 1723053752,
    sunrise: 1723009152,
    sunset: 1723059062,
    temp: 28.07,
    feels_like: 27.06,
    pressure: 1009,
    humidity: 28,
    dew_point: 7.87,
    uvi: 0.5,
    clouds: 0,
    visibility: 10000,
    wind_speed: 5.55,
    wind_deg: 204,
    wind_gust: 6.38,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
  },
  daily: [],
};
