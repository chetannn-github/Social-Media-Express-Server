import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
            
        }
    ],

},{timestamps:true});

export const conversationModel = new mongoose.model("Conversation", conversationSchema)
