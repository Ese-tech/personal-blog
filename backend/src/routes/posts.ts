import express, { Request, Response } from "express";
import Post from "../models/Post";
import { verifyToken } from "../middleware/verifyToken";
import { verifyRole } from "../middleware/verifyRole";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'viewer' | 'user' | 'admin';
  };
}

const router = express.Router();

// Create post (authenticated)
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log('Creating post with data:', req.body);
    console.log('User:', req.user);
    
    const authorId = req.user!.id;
    const data = req.body;
    
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    console.log('Final data to save:', { ...data, author: authorId });
    
    const post = await Post.create({ ...data, author: authorId });
    const populatedPost = await Post.findById(post._id).populate('author', 'username avatar');
    res.json(populatedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit post (author or admin)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    const user = req.user!;
    if (post.author.toString() !== user.id && user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    
    // Update slug if title changed
    if (req.body.title && req.body.title !== post.title) {
      req.body.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
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
    const user = req.user!;
    if (post.author.toString() !== user.id && user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await Post.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts for admin
router.get("/all", verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(50).populate('author', 'username avatar');
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
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username avatar');
    if (!post) return res.status(404).json({ message: 'Not found' });
    // TODO: increment view counter
    res.json(post);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's posts (role-based access)
router.get('/my-posts', verifyToken, async (req: any, res: Response) => {
  try {
    console.log('Fetching posts for user:', {
      id: req.user?.id,
      role: req.user?.role
    });

    let posts;
    
    if (req.user?.role === 'admin') {
      // Admin sees all posts
      posts = await Post.find()
        .populate('author', 'username')
        .sort({ createdAt: -1 });
      console.log('Admin - found all posts:', posts.length);
    } else {
      // Regular users see only their own posts
      posts = await Post.find({ author: req.user?.id })
        .populate('author', 'username')
        .sort({ createdAt: -1 });
      console.log('User - found own posts:', posts.length);
    }

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
