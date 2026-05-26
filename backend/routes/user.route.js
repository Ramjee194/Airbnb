import express from 'express'
import { getProfile, updateProfile } from '../controllers/use.controller.js';
import isAuth from '../middlewares/isAuth.js';


const userRouter = express.Router()

userRouter.get('/profile', isAuth, getProfile);
userRouter.put('/profile/update', isAuth, updateProfile);


export default userRouter