import { model, Schema } from "mongoose";
import { ILocation } from "../types/locationInterfaces";

const locationSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  iso2: {
    type: String,
    required: true,
  },
  iso3: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  cityAscii: {
    type: String,
    required: true,
  },
});

locationSchema.index({ location: "2dsphere" });

export const Location = model<ILocation>("Location", locationSchema);
