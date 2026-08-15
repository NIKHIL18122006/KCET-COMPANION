import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  saveTestResult,
  getTestStats
} from "../controllers/testController.js";

const router = express.Router();

router.post("/result", authMiddleware, saveTestResult);

router.get("/stats", authMiddleware,getTestStats);

export default router;