import express from "express";
import Post from "../models/Post";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Create post (authenticated)
router.post("/", verifyToken, async (req, res) => {
  try {
    // @ts-ignore
    const authorId = req.user.id;
    const data = req.body;
    
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const post = await Post.create({ ...data, author: authorId });
    res.json(post);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit post (author or admin)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    // @ts-ignore
    const user = req.user;
    if (post.author.toString() !== user.id && user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    // @ts-ignore
    const user = req.user;
    if (post.author.toString() !== user.id && user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await post.remove();
    res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(50).populate('author', 'name avatar');
    res.json(posts);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name avatar');
    if (!post) return res.status(404).json({ message: 'Not found' });
    // TODO: increment view counter
    res.json(post);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own posts (drafts and published)
router.get("/user/me", verifyToken, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar');
    res.json(posts);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
