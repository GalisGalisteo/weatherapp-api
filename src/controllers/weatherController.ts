import { NextFunction, Request, Response } from "express";
import * as locationsService from "../services/weatherService.js";

export const getLocationWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { lon, lat } = req.query;
    const location = { lon: Number(lon), lat: Number(lat) };
    const weatherData = await locationsService.getLocationWeather(location);
    res.status(200).json(weatherData);
  } catch (error) {
    next(error);
  }
};
