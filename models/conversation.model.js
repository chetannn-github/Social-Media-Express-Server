import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
            
        }
    ],

},{timestamps:true});

conversationSchema.index({ participants: 1 });

export const conversationModel = new mongoose.model("Conversation", conversationSchema)
