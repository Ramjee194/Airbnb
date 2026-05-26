import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getMessages, getConversations } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/history/:otherUserId", isAuth, getMessages);
messageRouter.get("/conversations", isAuth, getConversations);

export default messageRouter;
