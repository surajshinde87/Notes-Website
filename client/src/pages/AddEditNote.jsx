import React, { useState } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const AddEditNote = ({ onClose, noteData, type, getAllNotes,showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/add-note", {
        title,
        content,
        tags,
      });

      console.log("New note response:", response.data); // ✅ Debugging

      if (response.data && response.data.note) {
        showToastMessage("Note added successfully")
        getAllNotes((prevNotes) => [...prevNotes, response.data.note]); // ✅ Append to state directly
        onClose(); // ✅ Close the modal
      }
    } catch (error) {
      console.error("Error adding note:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.put(
        `/api/notes/edit-note/${noteId}`,
        {
          title,
          content,
          tags,
        }
      );

      console.log("New note response:", response.data); // ✅ Debugging

      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully")
        getAllNotes((prevNotes) => [...prevNotes, response.data.note]); // ✅ Append to state directly
        onClose(); // ✅ Close the modal
      }
    } catch (error) {
      console.error("Error adding note:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote(); // ✅ Ensure this function works
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full flex items-center  justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400 " />
      </button>
      <div className="flex flex-col  gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="GO TO GYM AT 5PM"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <label className="input-label">CONTENT </label>
        <textarea
          type="text"
          className="text-xs text-slate-950 outline-none bg-slate-50 p-2 rounded "
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <div className="mt-3">
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>
        {error && <p className="text-xs text-red-500 p-2">{error}</p>}
        <button
          className="btn-primary font-medium mt-2 p-3"
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
    </div>
  );
};

export default AddEditNote;
