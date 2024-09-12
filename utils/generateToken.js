import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (data)=>{
    return jwt.sign(data,process.env.JWT_SECRET);
}