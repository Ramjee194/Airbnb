import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getHostDashboard } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();
dashboardRouter.get("/host", isAuth, getHostDashboard);

export default dashboardRouter;
