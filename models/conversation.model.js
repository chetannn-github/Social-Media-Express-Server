import mongoose from "mongoose";

const conversationSchema = new mongoose.schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ],

});

export const conversationModel = new mongoose.model("Conversation", conversationSchema)
