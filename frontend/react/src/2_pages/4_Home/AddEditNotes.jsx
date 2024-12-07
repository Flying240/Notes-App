import React, { useState } from "react";
import TagInput from "../../1_components/7_Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../3_utils/axiosInstance";

const AddEditNotes = ({
    noteData,
    type,
    onClose,
    getAllNotes,
    showToastMessage,
}) => {
    // State for title, content, tags, and error messages
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState("");

    // Function to handle adding a new note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post(`/notes/add-note`, {
                title,
                content,
                tags,
            });
            if (response.data?.note) {
                showToastMessage("Note Added Successfully");
                getAllNotes(); // Refresh the notes list
                onClose(); // Close the modal
            }
        } catch (err) {
            console.error(err);
            setError("Failed to add note");
        }
    };

    // Function to handle editing an existing note
    const editNote = async () => {
        try {
            const response = await axiosInstance.post(
                `/notes/edit-note/${noteData._id}`,
                { title, content, tags }
            );
            if (response.data?.note) {
                showToastMessage("Note Edited Successfully");
                getAllNotes(); // Refresh the notes list
                onClose(); // Close the modal
            }
        } catch (err) {
            console.error(err);
            setError("Failed to edit note");
        }
    };

    // Centralized function to handle both add and edit operations
    const handleAddNote = () => {
        if (!title.trim()) {
            setError("Please enter a title");
            return;
        }
        if (!content.trim()) {
            setError("Please enter content");
            return;
        }
        setError("");

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative">
            {/* Close Button */}
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>

            {/* Form */}
            <div className="flex flex-col fap-2">
                {/* Title Input */}
                <label className="input-label">Title</label>
                <input
                    type="text"
                    className="text-2xl text-slate-900 outline-none bg-slate-100 p-3 border rounded-md"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Content Input */}
                <div className="flex flex-col gap-2 mt-4">
                    <label className="input-label">Content</label>
                    <textarea
                        className="text-sm text-slate-900 outline-none bg-slate-200 p-2 rounded"
                        placeholder="Content"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Tags Input */}
                <div className="mt-3">
                    <label className="input-label">TAGS</label>
                    <TagInput
                        tags={tags}
                        setTags={setTags}
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sx pt-4">{error}</p>}

                {/* Submit Button */}
                <button
                    className="btn-primary font-medium mt-4 p-3"
                    onClick={handleAddNote}
                >
                    {type === "edit" ? "UPDATE" : "ADD"}
                </button>
            </div>
        </div>
    );
};

export default AddEditNotes;
