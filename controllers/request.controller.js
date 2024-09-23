import { notificationModel } from "../models/notification.model.js";
import { requestModel } from "../models/request.model.js";
import { userModel } from "../models/user.model.js";


export const sendFollowRequest = async (req, res) =>{
    try {
        let {recieverId} = req.body;
        let fromId = req.user._id;

        if(!recieverId){
            return res.json({error:"all field are required"});
        }
        if(fromId.toString()===recieverId){
            return res.json({error:"you cannot send follow request to yourself"})
        }

        let from = await userModel.findById(fromId);
        let to = await userModel.findById(recieverId);

        if( !from || !to ){
            return res.json({error:"user not found!!"});
        }
        
        // check kro kii jo request bhej rha (from) hh us ki followings me wo exist toh nhii krtaa hh
        
        if(from.followings.includes(to._id)){
            return res.json({error:"you already follow this account"})
        }
        
        let request = await requestModel.findOneAndDelete({from:fromId,to:recieverId});
        if(request){
            
            return res.json({message:"request removed successfully"});
        }else{
             request = new requestModel({from:fromId,to:recieverId});
            await request.save() ;
            res.json({message:"request sent successfully!!",request})  
        }
            
    } catch (error) {
      console.log(error.message);
      
      res.json({error:"something went wrong in sending follow request"});
    }
}


export const acceptFollowRequest = async (req, res) =>{
    let {requestId} = req.body;
    if(!requestId){
        return res.json({error:"all fields are required"});


    }

    let request =  await requestModel.findById(requestId);



    if(!request){
        return res.json({error:"request not found "});

    }

    if(request.to.toString()!== req.user._id.toString()){
        return res.json({error:"you are not authorised to accept this request"})
    }

    await request.findByIdAndDelete(requestId);


    // agr request accept ho jaae toh 
    //! followings me add krooo jisne request bheji hain  sender 
    //! followers me add krdo jike paas request aayii hhh

    let acceptor = await userModel.findById(request.to);
    let sender   = await userModel.findById(request.from);

    acceptor.followers.push(sender._id);
    sender.followings.push(acceptor._id);

    // create a notification to sender 
    let newNotification = new notificationModel({reciever:sender,type:"requestAccepted"})
    

    await Promise.all([acceptor.save(), sender.save(), newNotification.save()]);

   
    res.json({message:"follow request accepted successfully",request})
}

export const rejectFollowRequest = async (req, res) =>{
    let {requestId} = req.body;
    if(!requestId){
        return res.json({error:"all fields are required"});
    }
    let request =  await requestModel.findById(requestId);

    
    if(!request){
        return res.json({error:"request not found "});

    }
    
    if(request.to.toString()!== req.user._id.toString()){
        return res.json({error:"you are not authorised to reject this request"})
    }

    await request.findByIdAndDelete(requestId);

    
    res.json({message:"follow request rejected successfully",request})
}