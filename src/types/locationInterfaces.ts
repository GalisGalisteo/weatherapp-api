export interface LocationInput {
  lon: number | null;
  lat: number | null;
}

export interface ILocation {
  id: number;
  city: string;
  country: string;
  iso2: string;
  iso3: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  cityAscii: string;
}
