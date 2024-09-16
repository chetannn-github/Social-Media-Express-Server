import mongoose from "mongoose";

const messageSchema = new mongoose.schema({
    sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
           
    },
    reciever:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User" ,
            required:true
    },
    message:{
        type:String,
        
    },
    img:{
        type:String,
        default:"",
    },


});

export const messageModel = new mongoose.model("Message", messageSchema)
