import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className="border rounded-lg p-4 bg-white hover:shadow-xl transition-transform transform hover:scale-105 ease-in-out duration-300">
            {/* Header: Title and Pin Icon */}
            <div className="flex items-center justify-between">
                {/* Note Title and Date */}
                <div>
                    <h6 className="text-base font-semibold text-gray-800">
                        {title}
                    </h6>
                    <span className="text-xs text-blue-500">{date}</span>
                </div>

                {/* Pin Icon */}
                <MdOutlinePushPin
                    className={`cursor-pointer text-xl ${
                        isPinned ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-500`}
                    onClick={onPinNote}
                    title={isPinned ? "Unpin Note" : "Pin Note"}
                />
            </div>

            {/* Content Preview */}
            <p
                className="text-sm text-gray-600 mt-3 line-clamp-2"
                title={content} // Optional: Shows full content on hover
            >
                {content}
            </p>

            {/* Footer: Tags and Action Icons */}
            <div className="flex items-center justify-between mt-4">
                {/* Tags */}
                <div className="text-xs text-gray-500 truncate">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="mr-1"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Edit and Delete Icons */}
                <div className="flex items-center gap-3">
                    <MdCreate
                        className="text-lg cursor-pointer text-gray-500 hover:text-green-600"
                        onClick={onEdit}
                        title="Edit Note"
                    />
                    <MdDelete
                        className="text-lg cursor-pointer text-gray-500 hover:text-red-600"
                        onClick={onDelete}
                        title="Delete Note"
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
