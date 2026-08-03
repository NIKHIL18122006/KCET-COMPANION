import express from "express";
import {getQuestions} from "../controllers/questionController.js";
const router = express.Router();

//console.log("Question router initialized"); // Log when the question router is initialized
router.get("/", getQuestions);


export default router;