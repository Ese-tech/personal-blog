import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

// Get all users with /all endpoint (admin only) - copied from Express route
export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    
    // Verify admin role
    if (user.role !== 'admin') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }
    
    await connectDB();
    
    const users = await User.find({})
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    const error = err as Error;
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}