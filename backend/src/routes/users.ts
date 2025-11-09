import express from "express";
import User from "../models/User";
import Post from "../models/Post";

const router = express.Router();

// Get user profile by username
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password -email'); // Don't expose sensitive data
    
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
      .populate('author', 'name username');
    
    res.json({
      user,
      posts,
      postsCount: await Post.countDocuments({ 
        author: user._id, 
        status: 'published' 
      })
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;