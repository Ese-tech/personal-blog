import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

export async function verifyToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'no-secret') as any;
    
    // Fetch current user data from database to get fresh role
    await connectDB();
    const user = await User.findById(payload.id).select('role');
    if (!user) {
      throw new Error('User not found');
    }
    
    // return user info with fresh role from database
    return {
      id: payload.id,
      role: user.role
    };
  } catch (err) {
    throw new Error('Invalid token');
  }
}