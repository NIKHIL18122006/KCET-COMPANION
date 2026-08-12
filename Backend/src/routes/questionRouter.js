import express from "express";
import {getQuestions,getTest,getPyqs} from "../controllers/questionController.js";
const router = express.Router();

//console.log("Question router initialized"); // Log when the question router is initialized
router.get("/", getQuestions);
router.get("/test",getTest);
router.get("/pyqs",getPyqs);


export default router;