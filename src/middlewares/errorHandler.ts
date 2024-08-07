import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }
  switch (error.message) {
    case "InvalidLocationData":
      return res.status(400).json({ error: "Invalid input data" });
    case "ErrorFindingLocations":
      return res.status(404).json({ error: "Unable to find locations" });
    case "ErrorFetchingWeather":
      return res
        .status(500)
        .json({ error: "Unable to fetch weather from location" });
    default:
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "An unexpected error occurred." });
  }
};
