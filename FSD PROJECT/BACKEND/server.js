const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

// 🔐 Hardcoded Admin Credentials
const ADMIN_EMAIL = "veer@driveease.com";
const ADMIN_PASSWORD = "veer123";

// 👤 User Model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  })
);

// 🚀 SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// 🚀 LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // 🛡 Hardcoded Admin Login
  if (email === ADMIN_EMAIL) {
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    return res.status(200).json({
      message: "Admin login successful",
      user: { name: "Admin", email, role: "admin" },
    });
  }

  // 🔐 Regular user login
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});
