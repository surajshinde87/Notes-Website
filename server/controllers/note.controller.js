import { Notes } from "../models/notes.model.js"; // ✅ Ensure correct file name & path
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// ✅ Add Note
export const addNote = asyncHandler(async (req, res) => {
  try {
    const { title, tags, content } = req.body;
    const userId = req.user?.id || req.user._id;

    if (!title || !content) {
      throw new ApiError(400, "Title and content are required");
    }

    const note = new Notes({
      title,
      tags: tags || [],
      content,
      userId,
    });

    await note.save();
    res
      .status(201)
      .json({ success: true, message: "Note added successfully", note });
  } catch (error) {
    console.error("❌ Error adding note:", error);
    throw new ApiError(500, "Failed to add note");
  }
});

// ✅ Get All Note for Logged-in User
export const getAllNotes = asyncHandler(async (req, res) => {
  try {
    console.log("Decoded User:", req.user);
    const userId = req.user._id;

    // Fetch user's notes, sorting pinned notes first
    const notes = await Notes.find({ userId }).sort({ isPinned: -1 });

    if (!notes.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Notes found" });
    }

    res.status(200).json({
      success: true,
      message: "All Notes retrieved successfully",
      notes,
    });
  } catch (error) {
    console.error("❌ Error fetching Notes:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve Notes" });
  }
});

// ✅ Edit Note
export const editNote = asyncHandler(async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, tags, content, isPinned } = req.body;
    const userId = req.user._id;

    if (!title && !tags && !content && isPinned === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "No changes provided." });
    }

    // Find the note
    const note = await Notes.findOne({ _id: noteId, userId });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    // Update fields if provided
    if (title) note.title = title;
    if (tags) note.tags = tags;
    if (content) note.content = content;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();
    res
      .status(200)
      .json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    console.error("❌ Error editing note:", error);
    res.status(500).json({ success: false, message: "Failed to edit note" });
  }
});

// ✅ Delete Note
export const deleteNote = asyncHandler(async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user._id;

    console.log(`🗑️ Attempting to delete note: ${noteId} for user: ${userId}`);

    const note = await Notes.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found or unauthorized" });
    }

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    res.status(500).json({ success: false, message: "Failed to delete note" });
  }
});

// ✅ Update Note (Pin/Unpin)
export const updateNote = asyncHandler(async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const userId = req.user._id;

    console.log(`🔄 Updating Pin Status for Note: ${noteId}, User: ${userId}`);

    const note = await Notes.findOne({ _id: noteId, userId });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found or unauthorized" });
    }

    note.isPinned = isPinned;
    await note.save();

    res
      .status(200)
      .json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    console.error("❌ Error updating note:", error);
    res.status(500).json({ success: false, message: "Failed to update note" });
  }
});

// ✅ Search Note
export const searchNote = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id || req.user._id;
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }

    console.log(`🔍 Searching Notes for: "${query}"`);

    const matchingNotes = await Notes.find({
      userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    console.log("🔍 Found Notes:", matchingNotes.length);

    if (matchingNotes.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No matching Notes found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Notes found", notes: matchingNotes });
  } catch (error) {
    console.error("❌ Error searching Notes:", error);
    res.status(500).json({ success: false, message: "Failed to search Notes" });
  }
});
