import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth";
import postsRoutes from "./src/routes/posts";
import usersRoutes from "./src/routes/users";
import imagesRoutes from "./src/routes/images";
import { connectDB } from "./src/config/db";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// connect to mongo
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/images", imagesRoutes);

app.get("/", (_req, res) => res.json({ ok: true, name: "LumaPress API" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`LumaPress API listening on port ${PORT}`);
});
