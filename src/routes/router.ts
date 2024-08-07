import { Router } from "express";
import { getLocationWeather } from "../controllers/weatherController.js";

const router = Router();

router.get("/weather", getLocationWeather);

export default router;
