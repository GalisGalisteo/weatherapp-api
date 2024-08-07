import mongoose from "mongoose";
import app from "./app.js";
import { mongoUri, port } from "./config/constants.js";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB "${mongoUri}"`);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
