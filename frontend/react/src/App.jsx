import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./2_pages/4_Home/Home";
import Login from "./2_pages/5_Login/Login";
import SignUp from "./2_pages/6_SignUp/SignUp";

const AppRoutes = () => (
    <Router>
        <Routes>
            {/* Redirect root path to /dashboard */}
            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

            {/* Define application routes */}
            <Route
                path="/dashboard"
                element={<Home />}
            />
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/signup"
                element={<SignUp />}
            />
        </Routes>
    </Router>
);

const App = () => {
    return (
        <div>
            <h1>
                <AppRoutes />
            </h1>
        </div>
    );
};

export default App;