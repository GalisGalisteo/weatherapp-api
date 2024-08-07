import request from "supertest";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

app.get("/trigger-error", (req: Request, res: Response, next: NextFunction) => {
  const errorType = req.query.type as string;
  const error = new Error(errorType);
  next(error);
});

app.use(errorHandler);

describe("errorHandler middleware", () => {
  it("should return 400 for InvalidLocationData error", async () => {
    const response = await request(app).get(
      "/trigger-error?type=InvalidLocationData"
    );
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid input data" });
  });

  it("should return 404 for ErrorFindingLocations error", async () => {
    const response = await request(app).get(
      "/trigger-error?type=ErrorFindingLocations"
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Unable to find locations" });
  });

  it("should return 500 for ErrorFetchingWeather error", async () => {
    const response = await request(app).get(
      "/trigger-error?type=ErrorFetchingWeather"
    );
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Unable to fetch weather from location",
    });
  });

  it("should return 500 for an unexpected error", async () => {
    const response = await request(app).get(
      "/trigger-error?type=UnexpectedError"
    );
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "An unexpected error occurred." });
  });

  it("should log the error message for an unexpected error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await request(app).get("/trigger-error?type=UnexpectedError");
    expect(consoleSpy).toHaveBeenCalledWith("Error: UnexpectedError");
    consoleSpy.mockRestore();
  });
});
