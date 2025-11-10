import jwt from "jsonwebtoken";
import User from "../models/User";
export const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Not authenticated' });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'no-secret');
        // Fetch current user data from database to get fresh role
        const user = await User.findById(payload.id).select('role');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        // attach to req with fresh role from database
        req.user = {
            id: payload.id,
            role: user.role
        };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
