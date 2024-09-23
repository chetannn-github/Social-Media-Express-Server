import mongoose from "mongoose"

let requestSchema = new mongoose.Schema({
    status:{
        type:String,
        enum:["accepted","rejected","pending"],
        default:"pending"
    },
    from:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
    },
    to:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
    },

})

export const requestModel = new mongoose.model("Request",requestSchema);