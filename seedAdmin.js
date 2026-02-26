import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // path apne project ke hisaab se set karo

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yourdbname";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const adminUser = await User.create({
      username: "admin",
      email: "admin@bissgro.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully:");
    console.log(adminUser);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();