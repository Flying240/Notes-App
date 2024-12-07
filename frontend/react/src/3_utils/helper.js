/**
 * Validates an email address using a regular expression.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns `true` if the email is valid, otherwise `false`.
 *
 * Regex Explanation:
 * - `^[^\s@]+`: Ensures the email starts with non-whitespace and non-`@` characters.
 * - `@[^\s@]+`: Matches the `@` symbol followed by more non-whitespace characters.
 * - `\.[^\s@]+$`: Ensures the email ends with a `.` followed by valid domain characters.
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Generates initials from a given name.
 * 
 * @param {string} name - The full name of the user.
 * @returns {string | undefined} - The uppercase initials (up to 2 characters) or `undefined` if the name is invalid.
 * 
 * Logic:
 * - Splits the name into words based on spaces.
 * - Extracts the first letter of up to the first two words.
 * - Converts the initials to uppercase for consistency.
 * 
 * Edge Cases:
 * - Returns `undefined` if the name is not provided or is an empty string.
 */
export const getIntials = (name) => {
    if (!name) return;

    // Split name into individual words
    const words = name.split(" ");
    let initials = "";

    // Extract the first letter of up to two words
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};
