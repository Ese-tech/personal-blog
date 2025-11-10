import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Post from '@/lib/models/Post';
import { verifyToken } from '@/lib/auth';

// Get all posts for admin - copied from Express route
export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    
    // Verify admin role
    if (user.role !== 'admin') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }
    
    await connectDB();
    
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar');
    
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    const error = err as Error;
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}