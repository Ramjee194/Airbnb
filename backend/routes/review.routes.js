import express from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";
import isAuth from "../middlewares/isAuth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", isAuth, addReview);
reviewRouter.get("/:id", getReviews); // get reviews for a listing

export default router;
