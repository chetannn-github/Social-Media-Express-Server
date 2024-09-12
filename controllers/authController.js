import { userModel } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { validateEmail } from "../utils/validateEmail.js";

import crypto from "crypto";
import bcrypt from "bcrypt";

export const signUpController = async(req, res)=>{ 
    try {
        let {userName, password,email , confirmPassword, gender,fullName } = req.body;
        if(!userName || !password || !email || !confirmPassword || !gender  ||!fullName){
         return res.json({"error":"Please fill all the fields!!"})  ;
        
        }
        if(confirmPassword != password){return res.json({"error":"password and confirmPassword match nhii hue hh!!"})  ;}
        if(!validateEmail(email)){return res.json({"error":"email is not valid"})  ;}

        //finding user if it already exist in db 
        
         let user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({error:"Account already exists !!"});
        }

        user = await userModel.findOne({userName});

        if(user){
            return res.status(400).json({error:"username already exists !!"});
        }
        // if user dont exist
        // hash password 
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        let profilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        
        // then create a account in db
        user = new userModel({
            userName,
            password:hash,
            email,
            fullName,
            gender,
            profilePic,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })

        await user.save();

        
        

        // login krdoo --- token generate krdo jwt se and cookie set krdooo
        let token = generateToken(userName);
        res.cookie("token", token,{
            maxAge:1000*60*60*24*30,
        })

        // verification code wali email bhej do !!




        // user ki details send krdooo 
        console.log("signup route");
        res.json({userName:user.userName,email:user.email,gender:user.email,_id:user._id,profilePic:user.profilePic, verificationToken: user.verificationToken, isVerified:user.isVerified,resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpiresAt: user.resetPasswordExpiresAt,});


    } catch (error) {
        res.json({"error":"something went wrong in signup route"});
        console.log(error.message);
    }
  
}

export const verifyEmailController = async (req, res) =>{
    let { code} = req.body;
    try { 
        //find user on the basis of code 
        let user = await  userModel.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt: Date.now()},
        });

         // if user dne then invalid token bhej do
        
        if(!user){
            return res.json({error:"Invalid or expired verificationToken"});
        }

         // if user exists then update user verification true and verification token null
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();



        // send welcome email to user 


        // user data bhej do
        res.json({userName:user.userName,email:user.email,gender:user.email,_id:user._id,profilePic:user.profilePic, verificationToken: user.verificationToken, isVerified:user.isVerified,resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpiresAt: user.resetPasswordExpiresAt,});


    } catch (error) {
        console.log(error.message);
        res.json({error:"something went wrong in verification of user"})
    }

}

export const forgotPasswordController = async(req,res) =>{
    const {email } = req.body;

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({ error: "User not found" });

        }
        // find user on the basis of email and add resetPassword token and its expiry time.

        const resetToken  = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        
        // send reset password mail

        res.json({userName:user.userName,email:user.email,gender:user.email,_id:user._id,profilePic:user.profilePic, verificationToken: user.verificationToken, isVerified:user.isVerified,resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpiresAt: user.resetPasswordExpiresAt,});
        // res.json({ success: "Password reset link sent to your email" });

    } catch (error) {
        console.log("Error in forgot password controller" + error.message);
        res.json({error:"Error in forgot password controller"})
    }

    
    

}


export const resetPasswordController = async (req, res ) =>{
    const {password}= req.body;
    const {token }= req.params;

    try {
        
    // find user on the basis of resetCode 
        const user = await userModel.findOne({
        resetPasswordToken:token,
        resetPasswordExpiresAt:{$gt:Date.now()},
        })

        //if user dne 

        if(!user){
        return res.status(400).json({error: "Invalid or expired reset token" });

        }
        // if user exists then hash the password  aur update krdo password , resetToken ko null and expire ko null
        const salt = await  bcrypt.genSalt();
        const hash = await  bcrypt.hash(password, salt);
        
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken =  undefined;

        user.password  = hash;
        await user.save();

        // send email of password reset successfull
        

        //aur login krdoo 
        res.json({success:"Password reset successful !!"});

    }catch (error) {
        console.log("error in reset password controller " + error.message);
        res.json({error:"something went wrong in reset password "});
    }


}


export const loginController = async(req, res)=>{
    try {
        let {userName, password } = req.body;
        if(!userName || !password  ){
            return res.json({"error":"Please fill all the fields!!"})  ;
       
        }

        // user ko db se find kroo 
        let user = await userModel.findOne({userName});
    

        // if user dne => redirect krdo signup route pr 
        if(!user){
            return  res.json({"error":"username or password is wrong"});

        }

        // if user exist then compare password and hashpassword using bcrypt 
        let checkPass =await bcrypt.compare(password,user.password);
        if(!checkPass){
            return  res.json({"error":"username or password is wrong"});
        }

        // if password matches then token generate kro and cookie set krdooo
        let token = generateToken(userName);
        res.cookie("token",token,{
            maxAge:1000*24*3600*30,
        })
        // user ki details send krdooo

        res.json({userName:user.userName,email:user.email,gender:user.email,_id:user._id,profilePic:user.profilePic, verificationToken: user.verificationToken, isVerified:user.isVerified,resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpiresAt: user.resetPasswordExpiresAt,});


    } catch (error) {
        res.json({"error":"something went wrong in login route"});
        console.log(error.message);
    }
    
}

export const logoutController = (req, res)=>{
    // cookie ko delete kr do
    res.cookie("token","");
    console.log("logout route");
    res.json({"success":"logout successfull"})
}

