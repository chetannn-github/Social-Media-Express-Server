import { Router } from "express";
import { loginController, logoutController, signUpController } from "../controllers/authController.js";

const authRouter = Router();



authRouter.route("/signup").post(signUpController);
authRouter.route("/login").post(loginController);
authRouter.route("/logout").post(logoutController)

export default authRouter ;

