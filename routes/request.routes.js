import {Router} from "express";
import { acceptFollowRequest, getAllRequests, rejectFollowRequest, sendFollowRequest } from "../controllers/request.controller.js";

export const requestRoutes = Router();


requestRoutes.route("/").get(getAllRequests);
requestRoutes.route("/send").post(sendFollowRequest);
requestRoutes.route("/accept").post(acceptFollowRequest);
requestRoutes.route("/reject").post(rejectFollowRequest);