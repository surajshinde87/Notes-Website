import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";
import AddNoteImg from "../assets/add-note.svg";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add", // or "error"
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/get-user");
      console.log("API Response:", response.data); // ✅ Debugging
      setUserInfo(response.data); // ✅ Now it should work correctly
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/get-all-notes");
      console.log("Notes Response:", response.data); // Debugging
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const deleteNote = async (data) => {
    try {
      const noteId = data._id;
      const response = await axiosInstance.delete(
        `/api/notes/delete-note/${noteId}`
      );

      console.log("Delete note response:", response.data); // ✅ Debugging

      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully", "delete");

        // ✅ Correctly update state by filtering out the deleted note
        setAllNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Error:", error.response.data.message);
      }
    }
  };

  const updatePinned = async (noteData) => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.put(
        `/api/notes/update-note/${noteId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      console.log("New note response:", response.data);

      if (response.data && response.data.note) {
        showToastMessage("Note Pinned successfully");
        getAllNotes((prevNotes) => [...prevNotes, response.data.note]);
      }
    } catch (error) {
      console.error("Error Pinned note:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdAt}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {
                  updatePinned(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            ImgSrc={AddNoteImg}
            message={`Start creating your notes! Click the 'Add' button to jot down your thoughts,ideas and reminders.Let's get started!`}
          />
        )}
        <button
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
          <AddEditNote
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({ isShown: false, type: "add", data: null });
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
          />
        </Modal>
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      </div>
    </>
  );
};

export default Home;
