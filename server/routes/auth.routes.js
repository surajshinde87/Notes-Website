import express from "express";
import { CreateAccount, Login, getUser } from "../controllers/auth.controller.js";
import authenticateToken from "../middleware/authMiddleware.js"; // Middleware to protect routes

const authRoutes = express.Router();

// 📝 Register a new user
authRoutes.post("/register", CreateAccount);

// 🔐 Login user
authRoutes.post("/login", Login);

// 👤 Get user profile (Protected Route)
authRoutes.get("/get-user", authenticateToken, getUser);

export default authRoutes; // ✅ Now it matches the import in `index.js`
