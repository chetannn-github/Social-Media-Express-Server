import mongoose from "mongoose"

// defining the schema of our user means how our each document (row) of collection(table) will look like

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female"],
    },
    profilePic:{
        type:String,
        
    },
    
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    
    verificationToken: String,
    verificationTokenExpiresAt: Date,
})


// on the basis of schema i will create a users named collection 

export const userModel = mongoose.model("User", userSchema);
