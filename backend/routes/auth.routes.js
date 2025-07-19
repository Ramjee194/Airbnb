import express from "express"
import {signUp,login,logOut, forgotPassword, resetPassword} from "../controllers/auth.controller.js"




const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logOut)
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);



export default authRouter