const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);