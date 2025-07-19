import express from 'express'
import { getProfile } from '../controllers/use.controller.js';
import isAuth from '../middlewares/isAuth.js';


const userRouter = express.Router()

userRouter.get('/profile', isAuth, getProfile);


export default userRouter