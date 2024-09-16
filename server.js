import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./config/mongodb.config.js";

import authRoutes from "./routes/auth.routes.js"
import { isAuthenticated } from "./utils/isAuthenticated.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/api/test",isAuthenticated,(req,res)=>{
   res.send("test api")
})


app.use("/api/auth",authRoutes);




app.listen(process.env.PORT,()=>{
   connectToMongoDB()
    console.log(`server is live on port ${process.env.PORT}`);
 })