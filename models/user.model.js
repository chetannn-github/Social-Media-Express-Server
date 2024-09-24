import mongoose from "mongoose"

// defining the schema of our user means how our each document (row) of collection(table) will look like

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true, // index created automatically
        lowercase:true,
        maxLength:20,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
         trim:true,
    },
    password:{
        type:String,
        required:true,
        maxLength:15,
        minLength:8,
        trim:true,
    },
    gender:{
        type:String,
        enum:["male","female"],
    },

    

    profilePic:{
        type:String,
        
    },
    bio:{
        type:String,
        default:"",
        maxLength:20, 
        trim:true,
    },


    posts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Post",
        default:[]
    },
    likedPosts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Post",
        default:[]
    },
    savedPosts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Post",
        default:[]
    },
    
    followers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]
    }, 
    followings:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]
    },
    isFrozen:{
        type:Boolean,
        default:false,
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
