import { notificationModel } from "../models/notification.model.js"

export const getAllNotifications = async(req,res) =>{
    // loggedin user ki saari notification find kr
    try {
        let notifications = await notificationModel.find({reciever:req.user._id});
        res.json(notifications);
    } catch (error) {
        console.log("something went wrong in getting notifications")
        res.json({error:"error in getting notifications"})
    }
}

export const readAllNotifications = async(req,res) =>{
    try {
        let notifications = await notificationModel.updateMany({reciever:req.user._id},{read:true});
        if(!notifications){
            return res.json({error:"no notification"})
        }
        return res.json({success:"notifications deleted successfully."})
        } catch (error) {
            console.log("something went wrong in reading notifications")
            res.json({error:"error in reading notifications"})
        }
}

export const deleteAllNotifications = async(req, res) =>{
    try {
        let notifications = await notificationModel.deleteMany({reciever:req.user._id});
        if(!notifications){
            return res.json({error:"no notification"})
        }
        return res.json({success:"notifications deleted successfully."})
    } catch (error) {
        console.log("something went wrong in deleting notifications")
        res.json({error:"error in deleting notifications"})
    }
}
