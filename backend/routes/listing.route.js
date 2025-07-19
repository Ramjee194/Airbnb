import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';
import { addListing,searchListings, getListing, getMyListings ,updateListing,deleteListing, getAllListingsWithBookingStatus, } from '../controllers/listing.controller.js';
import { findListing } from '../controllers/listing.controller.js';
import { findListingById } from '../controllers/listing.controller.js';

const listingRouter = express.Router();

listingRouter.post("/add", isAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), addListing);

listingRouter.post("/update/:id", isAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), updateListing);

listingRouter.get("/get", getListing);
listingRouter.get("/mylistings", isAuth, getMyListings); // ✅ fixed here

listingRouter.get("/findlistingbyid/:id", isAuth, findListingById);

listingRouter.put("/edit/:id", isAuth, updateListing);
listingRouter.delete("/delete/:id", isAuth, deleteListing);
listingRouter.get("/withbooking", getAllListingsWithBookingStatus);
listingRouter.get('/public', async (req, res) => {
  try {
    const listings = await Listing.find().limit(20); // public listings
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch public listings' });
  }
});






export default listingRouter;
