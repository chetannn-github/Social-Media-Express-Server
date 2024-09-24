import { notificationModel } from "../models/notification.model.js";
import { postModel } from "../models/post.model.js";
import { userModel } from "../models/user.model.js";

export const createPost = async (req, res) =>{
    try {
        let { caption ,postedBy, image} = req.body;
        let photoURL ;

        if(!caption || !postedBy){
            return res.status(400).json({ error: "Postedby and text fields are required" });
        }
        const maxLength = 300;
		if (caption.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

        if(postedBy!= req.user._id.toString()){
            return res.status(401).json({ error: "Unauthorized to create post" });
        }

        let loggedInUser  = await userModel.findById(req.user._id) ;
        
        if(!loggedInUser){
            return res.json({error:"User not found"});
        }
        
        // upload image and get the url from cloudinary
        
        // if(image){
        //      photoURL = 
        // }
        
       

        let post = new postModel({caption, photoURL, owner:req.user._id,});

        await post.save();
        loggedInUser.posts.push(post._id);
        await loggedInUser.save() ;

        res.json({
            success:"Post Created Successfully",
            loggedInUser,
            post

        })



    } catch (error) {
        res.json({error:error.message});
        console.log("error in creating post "+error);
        
    }
}


export const likePost = async (req, res) =>{
    try {

        let {postId} = req.params;
        let loggedInUser = await userModel.findById(req.user._id);
        let post = await postModel.findById(postId);

        

        if(!loggedInUser){
            return res.json({error:"Not Authenticated"});
        }
        if(!post){
            return res.json({error:"Post not found!!"});
        }

        if(loggedInUser.likedPosts.includes(postId)){
            //unlike
            loggedInUser.likedPosts = loggedInUser.likedPosts.filter((likedPostId)=>(likedPostId!=postId));
            post.likes = post.likes.filter((userId)=>(userId.toString()!=loggedInUser._id.toString()));
            console.log(post.likes);
            console.log("unlike hua");
            
            

        }else{
            // like
            loggedInUser.likedPosts.push(postId);
            post.likes.push(loggedInUser._id); 
            console.log("like hua");

            let newNotification = new notificationModel({reciever:post.owner,type:"like"});
            await newNotification.save();
            
           
        }
        await post.save();
        await loggedInUser.save();

        res.json({loggedInUser,post});
        
    } catch (error) {
        res.json({error:error.message});
        console.log("error in like/unlike post "+error);
    }
}

export const deletePost = async (req, res) =>{
    try {
        let {postId} = req.params;
        let loggedInUser = req.user;

        let post = await postModel.findById(postId);

        if(post.owner.toString()!=loggedInUser._id.toString() ){
            return res.json({error:"you are not owner of this post"})
        }

        

        post = await postModel.findByIdAndDelete(postId);
        if (!post) {
            throw new Error("Post not found");
        }

        // Remove the post's ID from the user's posts array
        await userModel.updateOne({ _id: post.owner }, { $pull: { posts: postId } });

        // Remove the post's ID from the users' likedPosts arrays
        await userModel.updateMany({ likedPosts: { $in: [postId] } }, { $pull: { likedPosts: postId } });

        // Remove the post's ID from the users' savedPosts arrays
        await userModel.updateMany({ savedPosts: { $in: [postId] } }, { $pull: { savedPosts: postId } });

        res.json({success:"Post deleted Successfully"})

        
    } catch (error) {
        res.json({error:error.message});
        console.log("error in deleting  post "+error);
    }
}

export const savePost = async (req, res) =>{
    try {

        let {postId} = req.params;
        let loggedInUser = await userModel.findById(req.user._id);
        let post = await postModel.findById(postId);

        

        if(!loggedInUser){
            return res.json({error:"Not Authenticated"});
        }
        if(!post){
            return res.json({error:"Post not found!!"});
        }

        if(loggedInUser.savedPosts.includes(postId)){
            //unsave
            loggedInUser.savedPosts = loggedInUser.savedPosts.filter((likedPostId)=>(likedPostId!=postId));
           
           
            console.log("save hua");
            
            

        }else{
            // save
            loggedInUser.savedPosts.push(postId);
          
            console.log("unsave hua");
            
           
        }
       
        await loggedInUser.save();

        res.json({loggedInUser});
        
    } catch (error) {
        res.json({error:error.message});
        console.log("error in save post "+error);
    }
}

export const getPost = async (req, res) =>{
    try {
        let { postId } = req.params;

        //find post in db on the basis of postID
        let post = await postModel.findById(postId);
        if(!post){
            return res.json({
                error:"post not found"
            })
        }        

        return res.json({post});
    } catch (error) {
        console.log("something went wrong in get post");
        res.json({error:"something went wrong in get post"});
    }
}


export const getFeedPosts = async (req, res) =>{
    try {
        // get all the posts by user and his followers
        let currentUser = await userModel.findById(req.user._id);

        let posts = await postModel.find({
            owner:{$in:[req.user._id,...currentUser.followings]}
        })
        if(!posts.length){
            return res.json({message:"No feed !"});
        }
        res.json({posts});

    } catch (error) {
        console.log("something went wrong in feed post");
        res.json({error:"something went wrong in feed post"});
    }
}



export const createComment= async (req, res) =>{
    try {
        let {text , postId} = req.body;
        if(!text || !postId){
            return res.json({error:"All fields are required!"});
        }

        let user = await userModel.findById(req.user._id);
        let post = await postModel.findById(postId);
        if(!post){
            return res.json({error:"post not found"});
        }
        if(!user){
            return res.json({error:"user not found"});
        }
        post.comments.push({text, userId:req.user._id,userProfilePic:user.profilePic,userName:user.userName});
        let newNotification = new notificationModel({reciever:post.owner,type:"comment"});
        await newNotification.save();
        await post.save();

        res.json(post);
        
    } catch (error) {
        
    }
}