import {Router} from "express";
import { acceptFollowRequest, rejectFollowRequest, sendFollowRequest } from "../controllers/request.controller.js";

export const requestRoutes = Router();

requestRoutes.route("/send").post(sendFollowRequest);
requestRoutes.route("/accept").post(acceptFollowRequest);
requestRoutes.route("/reject").post(rejectFollowRequest);