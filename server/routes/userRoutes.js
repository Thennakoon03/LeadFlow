import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getSalespeople } from "../controllers/userController.js";

const router = express.Router();

router.get("/salespeople", protect, getSalespeople);

export default router;
