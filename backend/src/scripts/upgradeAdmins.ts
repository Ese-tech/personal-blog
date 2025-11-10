import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const upgradeAdmins = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumapress');
    console.log('Connected to MongoDB');

    // Admin emails to upgrade
    const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];

    // Find and upgrade users with admin emails
    const users = await User.find({ 
      email: { $in: adminEmails },
      role: { $ne: 'admin' }
    });

    console.log(`Found ${users.length} users to upgrade to admin role`);

    for (const user of users) {
      user.role = 'admin';
      await user.save();
      console.log(`✅ Upgraded ${user.email} (${user.username}) to admin role`);
    }

    // Also check for case-insensitive matches
    const lowerCaseEmails = adminEmails.map(email => email.toLowerCase());
    const usersLowerCase = await User.find({
      $expr: {
        $and: [
          { $in: [{ $toLower: "$email" }, lowerCaseEmails] },
          { $ne: ["$role", "admin"] }
        ]
      }
    });

    console.log(`Found ${usersLowerCase.length} additional users (case-insensitive) to upgrade to admin role`);

    for (const user of usersLowerCase) {
      if (!users.find(u => u._id.equals(user._id))) { // Avoid duplicates
        user.role = 'admin';
        await user.save();
        console.log(`✅ Upgraded ${user.email} (${user.username}) to admin role (case-insensitive match)`);
      }
    }

    console.log('Admin upgrade completed successfully!');
    
  } catch (error) {
    console.error('Error upgrading admins:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

upgradeAdmins();