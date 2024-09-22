import {Router} from "express";
import { followUnFollowUser, freezeAccount, getSuggestedUsers, getUserProfile, updateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

let userRoutes = Router();


userRoutes.get("/suggested",getSuggestedUsers);
userRoutes.get("/profile/:userName",getUserProfile);

userRoutes.patch("/freeze",isAuthenticated,freezeAccount);
userRoutes.patch("/update/:id",isAuthenticated,updateUser);
userRoutes.post("/follow/:id",isAuthenticated,followUnFollowUser);

export  default userRoutes ;
