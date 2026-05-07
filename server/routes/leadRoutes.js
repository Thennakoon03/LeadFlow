import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from "../controllers/leadController.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createLead).get(getLeads);
router.route("/:id").get(getLeadById).put(updateLead).delete(deleteLead);

export default router;
