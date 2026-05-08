import mongoose from "mongoose";

const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    leadSource: {
      type: String,
      required: true,
      trim: true,
    },
    assignedSalesperson: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: leadStatuses,
      default: "New",
    },
    hasBeenQualified: {
      type: Boolean,
      default: false,
    },
    estimatedDealValue: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export { leadStatuses };
export default Lead;
