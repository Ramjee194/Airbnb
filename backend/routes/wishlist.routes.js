import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getUserWishlist,
  toggleWishlist,
} from "../controllers/wishlist.controller.js";

const whishlistRouter = express.Router();

whishlistRouter.get("/mine", isAuth, getUserWishlist);
whishlistRouter.post("/toggle/:listingId", isAuth, toggleWishlist);

export default whishlistRouter ;
