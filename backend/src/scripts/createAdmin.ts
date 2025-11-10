import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User";
import { connectDB } from "../config/db";

dotenv.config();

async function createAdminUser() {
  try {
    // Connect to database
    await connectDB();

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@ecommerce.com" });
    if (existingAdmin) {
      console.log("Admin user already exists with email: admin@ecommerce.com");
      
      // Also check the alternative email
      const altAdmin = await User.findOne({ email: "admin@lumapress.com" });
      if (altAdmin) {
        console.log("Admin user also exists with email: admin@lumapress.com");
      } else {
        // Create second admin with alternative email
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
          username: "Admin-Eve-Alt",
          email: "admin@lumapress.com",
          password: hashedPassword,
          role: "admin",
          bio: "LumaPress Administrator"
        });
        console.log("✅ Created admin user with email: admin@lumapress.com");
      }
      
      process.exit(0);
    }

    // Create admin user with provided credentials
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const adminUser = await User.create({
      username: "Admin-Eve",
      email: "admin@ecommerce.com",
      password: hashedPassword,
      role: "admin",
      bio: "LumaPress Administrator"
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@ecommerce.com");
    console.log("👤 Username: Admin-Eve");
    console.log("🔑 Password: admin123");
    console.log("🛡️ Role: admin");

    // Create second admin with alternative email
    const altAdminUser = await User.create({
      username: "Admin-Eve-Alt",
      email: "admin@lumapress.com",
      password: hashedPassword,
      role: "admin",
      bio: "LumaPress Administrator"
    });

    console.log("✅ Alternative admin user created successfully!");
    console.log("📧 Email: admin@lumapress.com");
    console.log("👤 Username: Admin-Eve-Alt");
    console.log("🔑 Password: admin123");
    console.log("🛡️ Role: admin");

  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdminUser();