import mongoose, { Schema, Document } from "mongoose";
import { CurrentWeather } from "../types/weatherInterfaces";

const weatherSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  main: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const userWeatherRecordSchema: Schema = new Schema(
  {
    searchDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dt: {
      type: Number,
      required: true,
    },
    sunrise: {
      type: Number,
      required: true,
    },
    sunset: {
      type: Number,
      required: true,
    },
    temp: {
      type: Number,
      required: true,
    },
    feels_like: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    dew_point: {
      type: Number,
      required: true,
    },
    uvi: {
      type: Number,
      required: true,
    },
    clouds: {
      type: Number,
      required: true,
    },
    visibility: {
      type: Number,
      required: true,
    },
    wind_speed: {
      type: Number,
      required: true,
    },
    wind_deg: {
      type: Number,
      required: true,
    },
    weather: {
      type: [weatherSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const UserWeatherRecord = mongoose.model<CurrentWeather>(
  "UserWeatherRecord",
  userWeatherRecordSchema
);
