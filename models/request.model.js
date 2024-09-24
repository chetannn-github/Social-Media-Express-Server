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
            required:true
    },
    to:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", 
            required:true,
            index:true,
    },

})

requestSchema.index({from:1,to:1});

export const requestModel = new mongoose.model("Request",requestSchema);