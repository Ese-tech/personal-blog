import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth";
import postsRoutes from "./src/routes/posts";
import { connectDB } from "./src/config/db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// connect to mongo
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.get("/", (_req, res) => res.json({ ok: true, name: "LumaPress API" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`LumaPress API listening on port ${PORT}`);
});
