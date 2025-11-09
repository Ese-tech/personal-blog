import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'no-secret');
    // attach to req
    // @ts-ignore
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
