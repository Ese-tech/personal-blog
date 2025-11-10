import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
const checkAdminUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumapress');
        console.log('Connected to MongoDB');
        // Admin emails to check
        const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
        console.log('🔍 Checking admin users in database:');
        for (const email of adminEmails) {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                console.log(`✅ ${email}: Found | Role: ${user.role} | Username: ${user.username} | ID: ${user._id}`);
            }
            else {
                console.log(`❌ ${email}: Not found in database`);
            }
        }
        // Also check case-insensitive
        const users = await User.find({
            $expr: {
                $in: [{ $toLower: "$email" }, adminEmails.map(e => e.toLowerCase())]
            }
        });
        console.log(`\n📊 Total admin users found: ${users.length}`);
        console.log('\n💡 If the admin is getting 403 errors:');
        console.log('1. The user needs to log out and log back in to get a fresh JWT token');
        console.log('2. Or clear browser cookies and login again');
        console.log('3. The verifyToken middleware now fetches fresh role from database');
    }
    catch (error) {
        console.error('Error checking admin users:', error);
    }
    finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};
checkAdminUsers();
