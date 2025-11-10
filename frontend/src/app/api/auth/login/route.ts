import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    
    // Upgrade to admin role for specific emails
    const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
    if (adminEmails.includes(email.toLowerCase()) && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
      console.log(`Upgraded user ${email} to admin role`);
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "no-secret", { expiresIn: '7d' });

    const response = NextResponse.json({ user: { id: user._id, email: user.email, username: user.username, role: user.role } });
    
    response.cookies.set('token', token, { 
      httpOnly: true, 
      sameSite: 'lax', 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}