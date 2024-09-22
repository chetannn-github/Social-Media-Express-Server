import jwt from "jsonwebtoken";
import "dotenv/config";
import { userModel } from "../models/user.model.js";

export const isAuthenticated = async(req,res,next) =>{
    
    try {
        if(req.cookies.token){
            //jwt se username nikal lo jo 
            const id = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

            // request object mein user field add krdo jisse baaki ke process me hume user ki info rhe !!!


            req.user = await userModel.findById(id).select("-password").populate(["posts","likedPosts","savedPosts"]);
            // console.log("authenticated user==>>>> " + req.user   )
            next();
        }
        else{res.json({error:"Not Authenticated"});}
    } catch (error) {
        console.log(error.message);
        res.json({error:"error in isAuthenticated middleware"});
        
    }
}