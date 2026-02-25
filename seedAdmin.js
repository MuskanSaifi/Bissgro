const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ⚠️ Path apne project ke hisaab se set karo
// Agar model: models/User.js me hai:
const User = require("./models/User");

// Agar aapka model src/models/User.js me hai, to upar wali line hata ke ye use karo:
// const User = require("./src/models/User");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bissgro";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const adminUser = await User.create({
      username: "admin",
      email: "admin@bissgro.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("🎉 Admin created successfully!");
    console.log("📧 Email:", adminUser.email);
    console.log("🔐 Password: Admin@123");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

seedAdmin();