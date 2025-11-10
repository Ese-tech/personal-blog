import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Post from '@/lib/models/Post';
import { verifyToken } from '@/lib/auth';

// Edit post (author or admin) - copied from Express route
export async function PUT(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const user = await verifyToken(request);
    
    await connectDB();
    
    const id = params.postId;
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    
    if (post.author.toString() !== user.id && user.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    
    const data = await request.json();
    
    // Update slug if title changed
    if (data.title && data.title !== post.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    Object.assign(post, data);
    await post.save();
    
    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    const error = err as Error;
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Delete post - copied from Express route
export async function DELETE(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const user = await verifyToken(request);
    
    await connectDB();
    
    const id = params.postId;
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    
    if (post.author.toString() !== user.id && user.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    
    await Post.findByIdAndDelete(id);
    
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    const error = err as Error;
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}