import mongoose, { Mongoose } from "mongoose"
const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    photoURL:{
         type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    comments:[
        {
            userId:{ 
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                default:[]
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            userName: {
                type: String,
            },
            
        },
    ],
});

export const postModel = new mongoose.model("Post", postSchema)