const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../5_utilities/authenticateToken");
const User = require("../3_models/user.model");

const router = express.Router();

// Utility Function to Validate Required Fields
const validateFields = (fields, res) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            res.status(400).json({
                error: true,
                message: `${key} is required`,
            });
            return false;
        }
    }
    return true;
};

// Create Account
router.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!validateFields({ fullName, email, password }, res)) return;

    try {
        if (await User.findOne({ email })) {
            return res.json({ error: true, message: "User already exists" });
        }

        const user = new User({ fullName, email, password });
        await user.save();

        const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            error: false,
            user,
            accessToken,
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!validateFields({ email, password }, res)) return;

    try {
        const userInfo = await User.findOne({ email });
        if (!userInfo || userInfo.password !== password) {
            return res
                .status(400)
                .json({ error: true, message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { user: userInfo },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            error: false,
            user: userInfo,
            accessToken,
            message: "User logged in successfully",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Get User Info
router.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const isUser = await User.findById(user._id);
        if (!isUser) {
            return res
                .status(401)
                .json({ error: true, message: "User not found" });
        }

        res.json({
            error: false,
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser.id,
                createdOn: isUser.createdOn,
            },
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
