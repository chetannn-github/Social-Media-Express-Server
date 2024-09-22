import mongoose from "mongoose";

const messageSchema = new mongoose.schema({
    sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
           
    },
    conversationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Conversation",
           
    },
    message:{
        type:String,
        
    },
    img:{
        type:String,
        default:"",
    },


},{timestamps:true});

export const messageModel = new mongoose.model("Message", messageSchema)
