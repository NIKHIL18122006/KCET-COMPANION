import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.get("/demo",(req,res)=>{
    res.send("ok");
})

export default app;