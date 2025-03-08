import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId, expiresIn = "7d") => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

// Create a new user (Register)
export const CreateAccount = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Create a new user (No password hashing)
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    // Generate JWT Token
    const accessToken = generateToken(newUser._id);

    return res.status(201).json({
      message: "User created successfully",
      user: { _id: newUser._id, fullName: newUser.fullName, email: newUser.email },
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// User Login
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare plain text passwords
    if (password !== userInfo.password) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // Generate JWT Token
    const accessToken = generateToken(userInfo._id);

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get User Profile
export const getUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: No user ID in token" });
    }

    const userId = req.user._id; // Always use `_id`
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // ✅ Send user object directly
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

