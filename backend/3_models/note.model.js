const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPinned: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
