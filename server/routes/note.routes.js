import { Router } from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
  updateNote,
} from "../controllers/note.controller.js";
import authenticateToken from "../middleware/authMiddleware.js"; // Middleware for authentication

const notesRouter = Router();

// 📝 Add a new note
notesRouter.post("/add-note", authenticateToken, addNote);

// ✏️ Edit an existing note
notesRouter.put("/edit-note/:noteId", authenticateToken, editNote);

// 📋 Get all notes of the logged-in user
notesRouter.get("/get-all-notes", authenticateToken, getAllNotes);

// ❌ Delete a note by ID
notesRouter.delete("/delete-note/:noteId", authenticateToken, deleteNote);

// 🔄 Update a note by ID
notesRouter.put("/update-note/:noteId", authenticateToken, updateNote);

// 🔍 Search for a note
notesRouter.get("/search-note", authenticateToken, searchNote);

export default notesRouter;
