import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/weatherapp";
export const weatherApiKey = process.env.WEATHER_API_KEY;
