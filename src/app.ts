import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/", router);
app.use(errorHandler);

export default app;
