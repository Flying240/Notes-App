import React, { useEffect, useState } from "react";
import Navbar from "../../1_components/Navbar";
import NoteCard from "../../1_components/8_Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../3_utils/axiosInstance";
import moment from "moment";
import Toast from "../../1_components/10_ToastMessage/Toast";
import EmptyCard from "../../1_components/8_Cards/EmptyCard";

// Set the app root element for accessibility
Modal.setAppElement("#root");

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "",
    });
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    // Fetch user information on component mount
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/users/get-user");
            if (response.data?.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            //this happens when backend server is down
            navigate("/Login");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch all notes on component mount or after actions (add/edit/delete)
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/notes/get-all-notes");
            if (response.data?.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            //this happens when backend server is down
            console.error("Failed to fetch notes:", error);
        }
    };

    // Handle the opening of the edit modal with pre-filled data
    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({
            isShown: true,
            type: "edit",
            data: noteDetails,
        });
    };

    // Show toast message
    const showToastMessage = (message, type) => {
        setShowToastMsg({ isShown: true, message, type });
    };

    // Close toast message
    const handleCloseToast = () => {
        setShowToastMsg({ isShown: false, message: "", type: "" });
    };

    // Handle note deletion
    const handleOndeleteNote = async (noteData) => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.delete(
                `/notes/delete-note/${noteId}`
            );
            if (response.data) {
                showToastMessage("Note deleted successfully", "delete");
                getAllNotes(); // Refresh notes after deletion
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            showToastMessage("Failed to delete note", "error");
        }
    };

    // Handle search query
    const onSearchNote = async (query) => {
        setIsSearch(true);
        try {
            const response = await axiosInstance.get("/notes/search-notes", {
                params: { query },
            });
            if (response.data?.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            //this happens when backend server is down
            console.error("Error searching notes:", error);
        }
    };

    // Clear search and reset notes list
    const handleOnClearSearch = () => {
        setIsSearch(false);
        getAllNotes(); // Reload all notes
    };

    // Update pinned status of a note
    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put(
                `/notes/update-note-pinned/${noteId}`,
                {
                    isPinned: !noteData.isPinned,
                }
            );
            if (response.data?.note) {
                showToastMessage("Pinned status updated", "update");
                getAllNotes(); // Refresh notes after update
            }
        } catch (error) {
            console.error("Error updating pinned status:", error);
        }
    };

    // Fetch user info and notes on component mount
    useEffect(() => {
        getUserInfo();
        getAllNotes();
    }, []);

    //loading is done because getuUserInfo is backend asynchronous call
    //till that its null value will be passed to navbar->profile/info where it access
    //  empty promise fullName which is not possible because it is null
    if (isLoading) {
        return (
            <img
                className="h-screen"
                src="./loading_image.jpg"
                alt="loading"
            />
        );
    }

    return (
        <div>
            <Navbar
                userInfo={userInfo}
                onSearchNote={onSearchNote}
                handleOnClearSearch={handleOnClearSearch}
            />

            <div className="container mx-auto">
                {/* Display notes or empty card if no notes */}
                {allNotes.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        {allNotes.map((item) => (
                            <NoteCard
                                key={item._id}
                                title={item.title}
                                date={moment(item.createdOn).format(
                                    "Do MMM YYYY"
                                )}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleOndeleteNote(item)}
                                onPinNote={() => updateIsPinned(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCard isSearch={isSearch} />
                )}
            </div>

            {/* Floating action button to add new note */}
            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10 absolute"
                onClick={() =>
                    setOpenAddEditModal({
                        isShown: true,
                        type: "add",
                        data: null,
                    })
                }
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            {/* Modal for adding/editing notes */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                }}
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() =>
                        setOpenAddEditModal({
                            isShown: false,
                            type: "add",
                            data: null,
                        })
                    }
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            {/* Toast message component */}
            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </div>
    );
};

export default Home;
