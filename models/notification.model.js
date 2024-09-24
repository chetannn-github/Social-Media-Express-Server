import mongoose from "mongoose";

let notificationSchema = new mongoose.Schema({
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        index:true
    },
    type:{
        type:String,
        enum:["requestAccepted", "like", "comment"]
    },
    read:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});


export const notificationModel = new mongoose.model("Notification",notificationSchema);