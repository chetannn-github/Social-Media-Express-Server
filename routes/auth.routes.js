import { Router } from "express";
import { 
        forgotPasswordController,
        loginController,
        logoutController,
        resetPasswordController,
        signUpController,
        verifyEmailController
        } from "../controllers/auth.controller.js";

const authRouter = Router();



authRouter.route("/signup").post(signUpController);
authRouter.route("/login").post(loginController);
authRouter.route("/logout").post(logoutController);

authRouter.post("/verify-email", verifyEmailController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password/:token", resetPasswordController);


export default authRouter ;

