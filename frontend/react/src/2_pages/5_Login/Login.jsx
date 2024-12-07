import React, { useState } from "react";
import Navbar from "../../1_components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Passwordinput from "../../1_components/7_Input/Passwordinput";
import { validateEmail } from "../../3_utils/helper";
import axiosInstance from "../../3_utils/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    /**
     * Handles the login process:
     * 1. Validates email format using a helper function to ensure the input meets basic standards.
     * 2. Prevents submission if any required field is empty, reducing server load.
     * 3. Interacts with the backend API via Axios to authenticate the user.
     * 4. Saves the access token in localStorage on success for persistent authentication.
     * 5. Redirects authenticated users to the dashboard to improve UX.
     */
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError(""); // Clear any previous errors before making the API call

        try {
            // Axios POST request to login endpoint
            const response = await axiosInstance.post("/users/login", {
                email,
                password,
            });

            // If the backend returns an access token, store it in localStorage
            if (response.data?.accessToken) {
                localStorage.setItem("token", response.data.accessToken);

                // Navigate to the dashboard upon successful login
                navigate("/dashboard");
            } else {
                // Show a meaningful error message if credentials are invalid
                //effects when email exits and password is wrong
                setError(
                    response.data?.message || "Invalid credentials (password)."
                );
            }
        } catch (error) {
            // Handle errors from the API or network
            const errorMessage =
                error.response?.data?.message ||
                "Failed to login. Please try again later.";
            setError(errorMessage);

            // Log detailed error information for debugging purposes
            console.error("Login error details:", error);
        }
    };

    return (
        <div>
            {/* Reusable Navbar component for consistent UI */}
            <Navbar />

            {/* Main content wrapper */}
            <div className="flex items-center justify-center mt-28">
                {/* Login form container */}
                <div className="w-96 border rounded bg-white p-12">
                    <form onSubmit={handleLogin}>
                        {/* Header for the login form */}
                        <h4 className="text-2xl mb-7">LogIn</h4>

                        {/* Email input field */}
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        {/* Password input field (custom component) */}
                        <Passwordinput
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        {/* Conditional rendering of error messages */}
                        {error && (
                            <p className="text-red-300 text-xs pb-1">{error}</p>
                        )}

                        {/* Submit button for the login form */}
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            LogIn
                        </button>

                        {/* Link to the SignUp page for new users */}
                        <p className="text-sm text-center mt-4">
                            Not Registered yet?{" "}
                            <Link
                                to="/SignUp"
                                className="font-medium text-primary underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
