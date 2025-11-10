import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { username, email, password } = await request.json();
    if (!email || !password || !username) return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ message: "Email already in use" }, { status: 409 });

    const hash = await bcrypt.hash(password, 10);
    
    // Assign admin role for specific emails
    const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
    const role = adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';
    
    const user = await User.create({ username, email, password: hash, role });

    // create JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "no-secret", { expiresIn: '7d' });

    const response = NextResponse.json({ user: { id: user._id, email: user.email, username: user.username, role: user.role } });
    
    // set httpOnly cookie
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