import mongoose from "mongoose";
import Lead from "../models/Lead.js";

const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    return res.status(201).json({
      message: "Lead created successfully.",
      lead,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create lead.",
      error: error.message,
    });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    return res.status(200).json(leads);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch leads.",
      error: error.message,
    });
  }
};

const getLeadById = async (req, res) => {
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

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch lead.",
      error: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    return res.status(200).json({
      message: "Lead updated successfully.",
      lead: updatedLead,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update lead.",
      error: error.message,
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lead id.",
      });
    }

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    return res.status(200).json({
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete lead.",
      error: error.message,
    });
  }
};

export { createLead, getLeads, getLeadById, updateLead, deleteLead };
