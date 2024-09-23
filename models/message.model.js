import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
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
    seen: {
        type: Boolean,
        default: false,
    },


},{timestamps:true});

export const messageModel = new mongoose.model("Message", messageSchema)