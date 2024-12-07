import React from "react";
import PropTypes from "prop-types";

const EmptyCard = ({ isSearch }) => {
    const imageSrc = isSearch
        ? "./NoMatchSearchQuery.png"
        : "./after_signUp.png";
    const imageAlt = isSearch
        ? "No Matching Search Query"
        : "Create Your First Note";

    const message = isSearch
        ? "Oops! No notes found matching your search. Would you like to create one?"
        : "Start creating your first note! Click the Add/Plus button at the bottom-right corner of the screen to begin. Unleash your thoughts, ideas, and reminders - tap the button now and get started!";

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <img
                src={imageSrc}
                alt={imageAlt}
                className="w-100 h-60"
            />

            <p className="w-3/4 text-base font-medium text-gray-600 leading-6 text-center mt-8">
                {message}
            </p>
        </div>
    );
};

EmptyCard.propTypes = {
    isSearch: PropTypes.bool.isRequired,
};

export default EmptyCard;
