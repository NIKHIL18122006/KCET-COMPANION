import express from "express";
import { explainQuestion } from "../controllers/aiController.js";

const router = express.Router();

router.post("/explain",explainQuestion);

export default router;