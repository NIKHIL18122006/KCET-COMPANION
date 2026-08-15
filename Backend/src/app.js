import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import questionRouter from "./routes/questionRouter.js";
import aiRouter from "./routes/aiRouter.js"
import testRouter from "./routes/testRoute.js";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/questions", questionRouter);
app.use("/api/ai", aiRouter);
app.use("/api/tests", testRouter);
export default app;