import React from "react";
import { getIntials } from "../../3_utils/helper"; // Helper function to get user initials

const ProfileInfo = ({ userInfo, onLogOut }) => {
    // Display a loading state if userInfo is not available yet
    if (!userInfo) return <div>Loading...</div>;

    return (
        <div className="flex items-center gap-3">
            {/* Avatar circle showing user's initials */}
            <div className="mr-3 w-12 h-12 flex items-center justify-center rounded-full text-slate-100 font-medium bg-blue-500">
                {getIntials(userInfo.fullName)}
            </div>

            {/* User details and logout button */}
            <div>
                <p className="text-sm font-medium">{userInfo.fullName}</p>
                <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={onLogOut}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
