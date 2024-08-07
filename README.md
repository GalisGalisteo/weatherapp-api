
# Weather App Backend

## Description

This project provides the backend API for the WeatherApp. It allows clients to fetch weather data for a given location, as well as the nearest 10 locations around it. The backend is built using TypeScript with Node.js, Express, and MongoDB.

## Features

- Fetch weather data for a specified location.
- Retrieve the 10 nearest locations around a given point.
- Store into the database historical weather search data.

## Prerequisites

- Node.js (version 14.x or higher)
-	npm (version 6.x or higher)
-	MongoDB

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/galisgaliste/weatherapp-api.git
   cd weatherapp-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root of the project and add your environment variables:
   ```env
   PORT=4000 (or any port you prefer)
   MONGODB_URI=your-mongodb-uri
   WEATHER_API_KEY=your-openweathermap-api-key
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Get Weather Data

- **URL:** `/weather`
- **Method:** `GET`
- **Query Parameters:**
  - `lon` (required): Longitude of the location.
  - `lat` (required): Latitude of the location.
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "locations": [...],
      "weather": {...}
    }
    ```

## Project Structure

```
.
├── config
│   └── constants.ts
├── controllers
│   └── weatherController.ts
├── middleware
│   └── errorHandler.ts
├── models
│   ├── location.ts
│   └── userWeatherRecord.ts
├── routes
│   └── router.ts
├── services
│   └── weatherService.ts
├── types
│   ├── locationInterfaces.ts
│   └── weatherInterfaces.ts
├── utils
│   └── getWeather.ts
├── app.ts
└── server.ts
```

## Documentation

### Models

#### location.ts

Schema and model for locations.

#### userWeatherRecord.ts

Schema and model for storing historical weather search data.

### Controllers

#### weatherController.ts

Handles the request to get nearest locations and weather data.

### Services

#### weatherService.ts

Contains the business logic to fetch nearest locations and weather data.

### Middleware

#### errorHandler.ts

Handles errors and sends an appropriate response.

### Utils

#### getWeather.ts

Utility function to fetch weather data from the OpenWeatherMap API.

### Types

#### locationInterfaces.ts

Defines TypeScript types for location-related data.

#### weatherInterfaces.ts

Defines TypeScript types for weather-related data.

## License

This project is licensed under the MIT License.
