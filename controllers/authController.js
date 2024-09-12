import { userModel } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { validateEmail } from "../utils/validateEmail.js";
import bcrypt from "bcrypt"

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
        
        let profilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        
        // then create a account in db
        user = new userModel({userName,password:hash,email,fullName,gender,profilePic })
        await user.save();

        
        

        // login krdoo --- token generate krdo jwt se and cookie set krdooo
        let token = generateToken(userName);
        res.cookie("token", token,{
            maxAge:1000*60*60*24*30,
        })
        // user ki details send krdooo 
        
        

        console.log("signup route");
        res.json({userName,email,gender,_id:user._id,profilePic})


    } catch (error) {
        res.json({"error":"something went wrong in signup route"});
        console.log(error.message);
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
        let checkPass = bcrypt.compare(password,user.password);
        if(!checkPass){
            return  res.json({"error":"username or password is wrong"});
        }

        // if password matches then token generate kro and cookie set krdooo
        let token = generateToken(userName);
        res.cookie("token",token,{
            maxAge:1000*24*3600*30,
        })
        // user ki details send krdooo

        res.json({userName,email:user.email,gender:user.gender,_id:user._id,profilePic:user.profilePic});


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

