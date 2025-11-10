export const verifyRole = (roles) => (req, res, next) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ message: "Not authenticated" });
    if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
