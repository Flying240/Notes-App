import React, { useState } from "react";
import Navbar from "../../1_components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Passwordinput from "../../1_components/7_Input/Passwordinput";
import { validateEmail } from "../../3_utils/helper";
import axiosInstance from "../../3_utils/axiosInstance";

function SignUp() {
    const [name, setName] = useState(""); // Stores user's name
    const [email, setEmail] = useState(""); // Stores user's email
    const [password, setPassword] = useState(""); // Stores user's password
    const [error, setError] = useState(null); // Tracks error messages

    const navigate = useNavigate();

    /**
     * Handles the sign-up process.
     * - Validates input fields for required data.
     * - Makes an API call to create a new user account.
     * - Navigates to the dashboard upon successful account creation.
     */
    const handleSignUp = async (e) => {
        e.preventDefault();

        // Input validation
        if (!name) {
            setError("Please enter your name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError(""); // Clear previous errors

        try {
            // API call to create an account
            const response = await axiosInstance.post("/users/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            if (response.data?.error) {
                setError(response.data.message); // Handle error response from server
                return;
            }

            if (response.data?.accessToken) {
                localStorage.setItem("token", response.data.accessToken); // Store token in localStorage
                navigate("/dashboard"); // Redirect to dashboard on success
            }
        } catch (error) {
            // Handle server or network errors
            const errorMessage =
                error.response?.data?.message ||
                "Failed to sign up. Please try again later.";
            setError(errorMessage);
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {/* Navbar component for consistent header */}
            <Navbar />

            {/* Form container for sign-up */}
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white p-12">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7">SignUp</h4>

                        {/* Input for name */}
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Input for email */}
                        <input
                            type="text"
                            placeholder="Enter your Email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Password input component */}
                        <Passwordinput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Display error messages, if any */}
                        {error && (
                            <p className="text-red-300 text-xs pb-1">{error}</p>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Create an Account
                        </button>

                        {/* Redirect link to Login page */}
                        <p className="text-sm text-center mt-4">
                            Already Have an Account?{" "}
                            <Link
                                to="/Login"
                                className="font-medium text-primary underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
