import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt"



export const freezeAccount = async (req, res) =>{
    try {
        // toggle account freeze 
        let user = await userModel.findById(req.user._id);

        user.isFrozen = !user.isFrozen;
        await user.save();
        user.password = undefined;
        res.json({message:`you account succesfully ${user.isFrozen? "frozen " :  " unfrozen "}`,user})
        
    } catch (error) {
        console.log("error in freezing account" + error.message);
        res.json({error:"something went wrong in freezing Account"});
    }
}


export const updateUser = async (req, res) =>{
    try {
        let user = req.user;
        //todo take input currentPassword also then only update password
        //todo also check username already exist or not
        
        let {userName ,password, fullName, bio} = req.body;

        if(user._id.toString() != req.params.id){
            return res.json({error:"you are not authorised to update this profile"})
        }
        
        user = await userModel.findById(user._id);

        if(!user){
            return res.json({error:"user not found! "})
        }


        if(password){
            let salt = await  bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
        }

        //todo profile pic update 



        // user update and save 
        user.userName = userName || user.userName;
        user.fullName = fullName || user.fullName;
        user.bio = bio || user.bio;
        
        

        
        user = await user.save();

        user.password = undefined;
        res.json(user);
        

    } catch (error) {
         console.log("error in updateUserProfile" + error.message);
        res.json({error:"something went wrong in  updateUserProfileuser "});
    }
}



export const getUserProfile= async (req, res) =>{

    try {
        const  {userName} = req.params;
        let user = await  userModel.findOne({userName});
        if(!user){
            return res.json({error:"user not found ! "});
        }
        if(user._id.toString()==req.user._id.toString()){
             user = await  userModel.findOne({userName}).select(["-password","-verificationToken"]).populate(["likedPosts","posts","savedPosts"]);
        }else{
            user = await  userModel.findOne({userName}).select(["-password","-likedPosts","-savedPosts","-verificationToken"]).populate(["posts"]);
        }
       
        res.json(user);

    } catch (error) {
        console.log("error in getUserProfile" + error.message);
        res.json({error:"something went wrong in getting user profile"});
        
    }
    
}


export const getSuggestedUsers = async (req, res)=>{
    try {
        // find all that users which not followed by loggedin user except him.
        let suggestedUsers = await userModel.find({
            $and: [
              { _id: { $ne: req.user._id } },
              { _id: { $nin: req.user.followings } }
            ]
          }).select("-password")
        if(!suggestedUsers || suggestedUsers.length==0){
            res.json({message:"no suggestions "})
        }
        
        res.json(suggestedUsers);
        
    } catch (error) {
        console.log("error in suggesting users" + error.message);
       return res.json({error:"something went wrong in suggesting user"});
    }
}


export const followUnFollowUser = async (req, res)=>{
    try {
        const {id} = req.params;
        
        const currentUser = await userModel.findById(req.user._id);
        const userToModify = await userModel.findById(id);

        if(id === req.user._id.toString()){
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
        }
        if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

        const isFollowing = currentUser.followings.includes(id);

        if(isFollowing){
            // unfollow
            await userModel.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
            let updatedUser =  await userModel.findByIdAndUpdate(currentUser,{$pull:{followings:id}},{returnDocument:"after"});
            return res.status(200).json({ 
                message: "User unfollowed successfully" ,
                user:updatedUser

            });
        }else{
            await userModel.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
            let updatedUser = await userModel.findByIdAndUpdate(currentUser,{$push:{followings:id}},{returnDocument:"after"});
            return res.status(200).json({ 
                message: "User followed successfully",
                user:updatedUser});
        }

    } catch (error) {
        console.log("error in follow users" + error.message);
        res.json({
            error:"something went wrong in follow user",
            
        }
        );
    }
}

