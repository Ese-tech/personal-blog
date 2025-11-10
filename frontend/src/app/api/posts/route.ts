import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Post from '@/lib/models/Post';
import { verifyToken } from '@/lib/auth';

// Create post (authenticated) - copied from Express route
export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    
    await connectDB();
    
    const data = await request.json();
    
    console.log('Creating post with data:', data);
    console.log('User:', user);
    
    const authorId = user.id;
    
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
    
    return NextResponse.json(populatedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    const error = err as Error;
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

// List posts (public) - copied from Express route
export async function GET() {
  try {
    await connectDB();
    
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(50).populate('author', 'username avatar');
    
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}