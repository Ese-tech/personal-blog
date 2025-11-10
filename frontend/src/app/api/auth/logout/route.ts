import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  
  // Clear cookie - exact copy of Express res.clearCookie('token')
  response.cookies.set('token', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/'
  });
  
  return response;
}