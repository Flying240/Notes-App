const express = require("express");
const { authenticateToken } = require("../5_utilities/authenticateToken");
const Note = require("../3_models/note.model");

// Initialize Router
const router = express.Router();

/**
 * @route POST /add-note
 * @description Add a new note for the authenticated user
 */
router.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    // Validate fields
    if (!title || !content) {
        return res.status(400).json({
            error: true,
            message: "Title and content are required",
        });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();
        res.json({ error: false, note, message: "Note added successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

/**
 * @route POST /edit-note/:noteId
 * @description Edit an existing note
 */
router.post("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res
            .status(400)
            .json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note not found" });
        }

        Object.assign(note, { title, content, tags, isPinned });
        await note.save();

        res.json({ error: false, note, message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

/**
 * @route GET /get-all-notes
 * @description Retrieve all notes for the authenticated user
 */
router.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({
            isPinned: -1,
        });
        res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

/**
 * @route DELETE /delete-note/:noteId
 * @description Delete a specific note
 */
router.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId });
        res.json({ error: false, message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

/**
 * @route PUT /update-note-pinned/:noteId
 * @description Update the pinned status of a note
 */
router.put(
    "/update-note-pinned/:noteId",
    authenticateToken,
    async (req, res) => {
        const { noteId } = req.params;
        const { isPinned } = req.body;
        const { user } = req.user;

        try {
            const note = await Note.findOne({ _id: noteId, userId: user._id });
            if (!note) {
                return res
                    .status(404)
                    .json({ error: true, message: "Note not found" });
            }

            note.isPinned = isPinned;
            await note.save();

            res.json({
                error: false,
                note,
                message: "Note pinned status updated",
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }
    }
);

/**
 * @route GET /search-notes
 * @description Search notes by query (title, content, or tags)
 */
router.get("/search-notes", authenticateToken, async (req, res) => {
    const { query } = req.query;
    const { user } = req.user;

    if (!query) {
        return res
            .status(400)
            .json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
                { tags: { $regex: new RegExp(query, "i") } },
            ],
        });

        res.json({
            error: false,
            notes: matchingNotes,
            message: `Notes matching query "${query}" retrieved successfully`,
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
