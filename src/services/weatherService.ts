import Joi from "joi";
import { Location } from "../models/location.js";
import { UserWeatherRecord } from "../models/userWeatherRecord.js";
import { getWeather } from "../utils/getWeather.js";
import { LocationInput } from "../types/locationInterfaces.js";

/**
 * Joi schema for validating location input.
 */

const locationSchema = Joi.object({
  lon: Joi.number().min(-180).max(180).required(),
  lat: Joi.number().min(-90).max(90).required(),
});

/**
 * Get location and weather data.
 *
 * @param {Object} location - The location input.
 * @param {number} location.lon - The longitude of the location.
 * @param {number} location.lat - The latitude of the location.
 * @returns {Promise<Object>} The location and weather data.
 */

export const getLocationWeather = async (
  location: LocationInput
): Promise<object> => {
  const { error, value } = locationSchema.validate(location);
  if (error) {
    console.error(`Validation Error: ${error.details[0].message}`);
    throw new Error("InvalidLocationData");
  }
  const { lon, lat } = value;

  try {
    const locations = await Location.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat],
          },
        },
      },
    }).limit(11);

    if (!locations.length) {
      console.error(
        `No Locations Found for coordinates: lon=${lon}, lat=${lat}`
      );
      throw new Error("NoLocationsFound");
    }

    const weather = await getWeather(lon, lat);

    const { current } = weather;

    UserWeatherRecord.create({
      ...current,
      searchDate: new Date(),
    });

    return {
      locations,
      weather,
    };
  } catch (error) {
    console.error(`Error Finding Locations: ${(error as Error).message}`);
    throw new Error("ErrorFindingLocations");
  }
};
