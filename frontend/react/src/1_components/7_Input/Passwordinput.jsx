import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Icons for toggling password visibility

/**
 * A reusable password input component that supports toggling
 * between visible and hidden states for the password field.
 *
 * Props:
 * - `value`: The current value of the input field (controlled component).
 * - `onChange`: A callback to handle value changes in the input field.
 * - `placeHolder`: An optional placeholder for the input field (default provided).
 */

const Passwordinput = ({ value, onChange }) => {
    // State to toggle visibility of the password
    const [isShowPassword, setIsShowPassword] = useState(false);

    // Toggle visibility state when the eye icon is clicked
    const toggleShowPassword = () => setIsShowPassword((prev) => !prev);

    return (
        <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
            {/* Password Input Field */}
            <input
                value={value} // Controlled input for password value
                onChange={onChange} // Prop callback to update the parent state
                type={isShowPassword ? "text" : "password"} // Toggles between plain text and password type
                placeholder={"Enter your password"} // Fallback placeholder
                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            />

            {/* Eye Icon: Toggles Password Visibility */}
            {isShowPassword ? (
                <FaRegEye
                    size={22}
                    className="text-primary cursor-pointer"
                    onClick={toggleShowPassword} // Show password as plain text
                    title="Hide Password" // Tooltip for better UX
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    className="text-slate-400 cursor-pointer"
                    onClick={toggleShowPassword} // Hide password
                    title="Show Password" // Tooltip for better UX
                />
            )}
        </div>
    );
};

export default Passwordinput;
