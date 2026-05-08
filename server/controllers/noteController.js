import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import Note from "../models/Note.js";

const addNoteToLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Note content is required.",
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    const note = await Note.create({
      lead: id,
      content: content.trim(),
      createdBy: req.user.name,
    });

    return res.status(201).json({
      message: "Note added successfully.",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add note.",
      error: error.message,
    });
  }
};

const getNotesForLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    const notes = await Note.find({ lead: id }).sort({
      isPinned: -1,
      createdAt: -1,
    });

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch notes.",
      error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id, noteId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        message: "Invalid note id.",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Note content is required.",
      });
    }

    const note = await Note.findOneAndUpdate(
      { _id: noteId, lead: id },
      { content: content.trim() },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    return res.status(200).json({
      message: "Note updated successfully.",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update note.",
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id, noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        message: "Invalid note id.",
      });
    }

    const note = await Note.findOneAndDelete({ _id: noteId, lead: id });

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete note.",
      error: error.message,
    });
  }
};

const togglePinnedNote = async (req, res) => {
  try {
    const { id, noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        message: "Invalid note id.",
      });
    }

    const note = await Note.findOne({ _id: noteId, lead: id });

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    return res.status(200).json({
      message: note.isPinned ? "Note pinned successfully." : "Note unpinned successfully.",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update note pin status.",
      error: error.message,
    });
  }
};

export {
  addNoteToLead,
  deleteNote,
  getNotesForLead,
  togglePinnedNote,
  updateNote,
};
