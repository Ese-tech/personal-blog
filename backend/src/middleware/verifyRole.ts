import { RequestHandler } from "express";

export const verifyRole = (roles: string[]): RequestHandler => (req, res, next) => {
  // @ts-ignore - req.user may be attached by auth middleware
  const user = (req as any).user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });
  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
