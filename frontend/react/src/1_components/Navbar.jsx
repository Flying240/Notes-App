import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "./8_Cards/ProfileInfo";
import SearchBar from "./9_SearchBar.jsx/SearchBar";

function Navbar({ userInfo, onSearchNote, handleOnClearSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Handles user logout by clearing local storage and navigating to Login
    const handleLogout = () => {
        localStorage.clear();
        navigate("/Login");
    };

    // Handles search input submission
    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    // Clears search input and invokes the parent clear handler
    const clearSearch = () => {
        setSearchQuery("");
        handleOnClearSearch();
    };

    // Render minimal Navbar when userInfo is not available
    if (!userInfo) {
        return (
            <div className="bg-white flex items-center justify-between px-6 py-3 drop-shadow">
                <h2 className="text-xl font-medium text-black py-2">Notes</h2>
            </div>
        );
    }

    return (
        <div className="bg-white flex items-center justify-between px-6 py-3 drop-shadow">
            {/* Logo with navigation link */}
            <h2 className="text-xl font-medium text-black py-2">
                <Link to="https://github.com/Flying240/Emails-Store--__MERN-Full-Stack-Web-development">
                    Notes
                </Link>
            </h2>

            {/* Search bar for note search */}
            <SearchBar
                value={searchQuery}
                onChange={({ target }) => {
                    const value = target.value;
                    setSearchQuery(value);
                    if (!value) clearSearch();
                }}
                handleSearch={handleSearch}
                onClearSearch={clearSearch}
            />

            {/* User profile info with logout functionality */}
            <ProfileInfo
                userInfo={userInfo}
                onLogOut={handleLogout}
            />
        </div>
    );
}

export default Navbar;
