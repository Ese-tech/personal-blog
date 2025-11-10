import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['viewer', 'user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

// MongoDB Connection
async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return true
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected successfully')
    return true
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Login attempt started')
    const { email, password } = await request.json()
    
    const dbConnected = await connectDB()
    if (!dbConnected) {
      return NextResponse.json({ message: 'Database connection failed' }, { status: 500 })
    }
    
    const user = await User.findOne({ email })
    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      console.log('Invalid password for user:', email)
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Upgrade to admin role for specific emails
    const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com']
    if (adminEmails.includes(email.toLowerCase()) && user.role !== 'admin') {
      user.role = 'admin'
      await user.save()
      console.log(`Upgraded user ${email} to admin role`)
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      user: { id: user._id, email: user.email, username: user.username, role: user.role }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('Login successful for user:', email)
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}