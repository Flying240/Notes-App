import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"; // Search icon
import { IoMdClose } from "react-icons/io"; // Clear input icon

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md shadow-sm">
            {/* Search input field */}
            <input
                type="text"
                placeholder="Search Notes"
                className="w-full text-sm bg-transparent py-2 outline-none"
                value={value}
                onChange={onChange}
            />

            {/* Clear search icon, shown only when there is input */}
            {value && (
                <IoMdClose
                    className="text-gray-500 cursor-pointer hover:text-red-500 mr-3"
                    onClick={onClearSearch}
                    title="Clear search"
                />
            )}

            {/* Search icon to trigger search */}
            <FaMagnifyingGlass
                className="text-yellow-700 cursor-pointer hover:text-green-500"
                onClick={handleSearch}
                title="Search"
            />
        </div>
    );
};

export default SearchBar;