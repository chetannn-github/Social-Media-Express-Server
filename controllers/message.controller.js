import { conversationModel } from "../models/conversation.model.js";
import { messageModel } from "../models/message.model.js";




export const sendMessage = async (req, res) =>{

    try {
        let senderId = req.user._id;
        let {message,recieverId,img} = req.body;
        
        if(!message || !recieverId){
            return res.json({error:"all fields are required!"})
        }
        
    
        //step1 find conversation
        let conversation = await conversationModel.findOne({participants:{$all:[recieverId,senderId]}});
    
        if(!conversation){
            console.log("conversation find nhi hui");
            conversation = new conversationModel ({
                participants:[senderId,recieverId]
            });
        }

        //! todo if image then upload
        
        if(img){
            //upload it  and get the link
        }

        let msg = new messageModel({
            senderId,message,conversationId:conversation._id,img

        })

        await Promise.all([msg.save(),conversation.save()]);

        res.json(msg)
        
    } catch (error) {
        console.log(error);
        return res.json({error:"something went wrong in sending messages."})
    }


}



export const getConversations = async (req, res) =>{
    try {
        let currentUser = req.user;
        // saari conversation find kro jisme currentUser participant hain
        let conversations = await conversationModel.find({participants:currentUser});

        res.json(conversations)
    } catch (error) {
        console.log(error);
        return res.json({error:"something went wrong in getting conversation."})
    }
   
    
}


export const getAllMessage = async (req, res) =>{

    try {
        let currentUser = req.user; 
        let {recieverId} = req.params;

        // conversation find kro iid ke basis pr
        // uss conversation id ke jitne bhii message  hain unhe find kro

        let conversation = await conversationModel.findOne({participants:{$all:[currentUser._id,recieverId]}});

        if(!conversation){
            return res.json({error:"conversation not found "})
        }

        let messages = await messageModel.find({conversationId:conversation._id});
        return res.json({messages});
     
    } catch (error) {
        console.log(error);
        return res.json({error:"something went wrong in getting messages."})
        
    }
    
     
}
