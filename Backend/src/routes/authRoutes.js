import express from "express";
import {registerUser} from "../controllers/authController.js";
import {loginUser} from "../controllers/authController.js";
import {getUser} from "../controllers/authController.js";
import {logoutUser} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;