import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createBooking,isListingBooked, getBookingById,getUserBookings, cancelBooking } from "../controllers/booking.controller.js";
import { getHostStats } from "../controllers/use.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", isAuth, createBooking);
bookingRouter.get("/my", isAuth, getUserBookings);
bookingRouter.put("/cancel/:id", isAuth, cancelBooking);
bookingRouter.get("/details/:id", isAuth, getBookingById);
bookingRouter.get("/check", isAuth, isListingBooked);
bookingRouter.get("/stats", isAuth, getHostStats);





export default bookingRouter;
