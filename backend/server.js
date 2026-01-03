import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import errorHandler from "./middlewares/errorHandler.js";
import ConnectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
ConnectDB();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: "Route not found", status: 404 });
});
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
