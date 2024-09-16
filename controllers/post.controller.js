import { postModel } from "../models/post.model";

export const getFeedPosts = async (req, res) =>{
    try {
        // get all the post by user and his followers
        let currentUser = req.user;
        


    } catch (error) {
        
    }
}


export const getUserPosts = async (req, res) =>{
    try {
        // get all the post by user 
        let currentUser = req.user;
        
        
    } catch (error) {
        
    }
}



export const createPost = async (req, res) =>{
    try {
        let {caption , image,} = req.body;
    } catch (error) {
        
    }
}


export const getPost = async (req, res) =>{
    try {
        let {postId } = req.params;
        
    } catch (error) {
        
    }
}



export const deletePost = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}


export const likePost = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}


export const createComment= async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}