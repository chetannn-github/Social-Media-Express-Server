import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./config/mongodb.config.js";

import authRoutes from "./routes/authRoutes.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);



app.listen(process.env.PORT,()=>{
   connectToMongoDB()
    console.log(`server is live on port ${process.env.PORT}`);
 })