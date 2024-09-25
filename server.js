import express from "express";
import cron from "node-cron"
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./config/mongodb.config.js";

import authRoutes from "./routes/auth.routes.js"
import { isAuthenticated } from "./utils/isAuthenticated.js";
import userRoutes from "./routes/user.routes.js";
import { postRoutes } from "./routes/post.routes.js";
import { chatRoutes } from "./routes/chat.routes.js";
import { requestRoutes } from "./routes/request.routes.js";
import { notificationRoutes } from "./routes/notification.routes.js";
import job from "./cron/cron.js";


const app = express();
job.start();

app.use(express.json()); // to parse json data from req.body
app.use(express.urlencoded({extended:true})); // to parse form  data from req.body
app.use(cookieParser());


app.get("/api/test",(req,res)=>{
   res.send("test api to awake server");
})


app.use("/api/auth",authRoutes);
app.use("/api/user",isAuthenticated,userRoutes);
app.use("/api/post", isAuthenticated, postRoutes);
app.use("/api/chat",isAuthenticated,chatRoutes);
app.use("/api/request",isAuthenticated,requestRoutes);
app.use("/api/notification",isAuthenticated,notificationRoutes);




app.listen(process.env.PORT,()=>{
   connectToMongoDB()
    console.log(`server is live on port ${process.env.PORT}`);
 })