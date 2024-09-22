import { Router } from "express";
import { 
        forgotPassword,
        login,
        logout,
        resetPassword,
        signUp,
        verifyEmail
        } from "../controllers/auth.controller.js";

const authRouter = Router();



authRouter.route("/signup").post(signUp);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

authRouter.post("/verify-email", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);


export default authRouter ;

