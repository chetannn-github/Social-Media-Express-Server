import { Router } from "express";
import { getAllMessage, getConversations, sendMessage } from "../controllers/message.controller.js";

export let chatRoutes = Router();

chatRoutes.route("/message").post(sendMessage);
chatRoutes.route("/:recieverId").get(getAllMessage);
chatRoutes.route("/").get(getConversations);
