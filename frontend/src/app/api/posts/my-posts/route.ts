import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Post from '@/lib/models/Post';
import { verifyToken } from '@/lib/auth';

// Get user's posts (role-based access) - copied from Express route
export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    
    await connectDB();
    
    console.log('Fetching posts for user:', {
      id: user.id,
      role: user.role
    });

    let posts;
    
    if (user.role === 'admin') {
      // Admin sees all posts
      posts = await Post.find()
        .populate('author', 'username')
        .sort({ createdAt: -1 });
      console.log('Admin - found all posts:', posts.length);
    } else {
      // Regular users see only their own posts
      posts = await Post.find({ author: user.id })
        .populate('author', 'username')
        .sort({ createdAt: -1 });
      console.log('User - found own posts:', posts.length);
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    const err = error as Error;
    if (err.message === 'Not authenticated' || err.message === 'Invalid token') {
      return NextResponse.json({ message: err.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}