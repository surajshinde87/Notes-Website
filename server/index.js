import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth.routes.js" 
import notesRouter from "./routes/note.routes.js";
import cors from "cors";

// ✅ Correct filename

dotenv.config({
    path:"./.env"
  })
  const app = express();
  app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));



// Middleware
app.use(express.json()); // Parse JSON requests

connectDB()

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
