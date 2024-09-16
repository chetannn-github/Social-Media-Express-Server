import {Router} from "express";
import { freezeAccount, getSuggestedUsers, getUserProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

let userRoutes = Router();


userRoutes.get("/suggested",getSuggestedUsers);
userRoutes.patch("/freeze",isAuthenticated,freezeAccount);
userRoutes.get("/:userName",getUserProfile);


export  default userRoutes ;
