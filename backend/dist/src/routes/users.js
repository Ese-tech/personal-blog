import express from "express";
import User from "../models/User";
import Post from "../models/Post";
import { verifyToken } from "../middleware/verifyToken";
import { verifyRole } from "../middleware/verifyRole";
const router = express.Router();
// Get all users (admin only)
router.get("/", verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .sort({ createdAt: -1 });
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all users with /all endpoint (admin only)
router.get("/all", verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .sort({ createdAt: -1 });
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Update user role (admin only)
router.put("/:id/role", verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const { role } = req.body;
        if (!['viewer', 'user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password -resetPasswordToken -resetPasswordExpires');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get user profile by username
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select('-password -email -resetPasswordToken -resetPasswordExpires'); // Don't expose sensitive data
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Get user's published posts
        const posts = await Post.find({
            author: user._id,
            status: 'published'
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('author', 'username');
        res.json({
            user,
            posts,
            postsCount: await Post.countDocuments({
                author: user._id,
                status: 'published'
            })
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
