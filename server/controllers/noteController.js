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

    const notes = await Note.find({ lead: id }).sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch notes.",
      error: error.message,
    });
  }
};

export { addNoteToLead, getNotesForLead };
