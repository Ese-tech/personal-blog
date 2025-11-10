import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userInfo = await verifyToken(request);
    
    await connectDB();
    const user = await User.findById(userInfo.id).select('-password');
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    
    // Upgrade to admin role for specific emails
    const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
    if (adminEmails.includes(user.email.toLowerCase()) && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
      console.log(`Upgraded user ${user.email} to admin role`);
    }
    
    return NextResponse.json({ _id: user._id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    const error = err as Error;
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}