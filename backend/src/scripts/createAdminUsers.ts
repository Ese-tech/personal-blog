import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdminUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumapress');
    console.log('Connected to MongoDB');

    // Admin users to create
    const adminUsers = [
      {
        username: 'AdminEcommerce',
        email: 'admin@ecommerce.com',
        password: 'admin123'
      },
      {
        username: 'AdminLumaPress',
        email: 'admin@lumapress.com',
        password: 'admin123'
      }
    ];

    for (const adminData of adminUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: adminData.email });
      
      if (existingUser) {
        console.log(`✅ User ${adminData.email} already exists`);
        
        // Ensure they have admin role
        if (existingUser.role !== 'admin') {
          existingUser.role = 'admin';
          await existingUser.save();
          console.log(`   ↳ Upgraded ${adminData.email} to admin role`);
        }
      } else {
        // Create new admin user
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        
        const newUser = await User.create({
          username: adminData.username,
          email: adminData.email,
          password: hashedPassword,
          role: 'admin'
        });

        console.log(`✅ Created new admin user: ${adminData.email} with username ${adminData.username}`);
      }
    }

    console.log('\n📋 Admin User Credentials:');
    console.log('Email: admin@ecommerce.com | Password: admin123');
    console.log('Email: admin@lumapress.com | Password: admin123');
    console.log('\nAdmin setup completed successfully!');
    
  } catch (error) {
    console.error('Error creating admin users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

createAdminUsers();