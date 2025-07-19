import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.js";

export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landMark, category } = req.body;

    // Upload images to Cloudinary
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    // Create new listing
    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landMark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    // ❌ Mistake: `findByIdUpdateOne` and `$puch` are incorrect
    // ✅ Fix: use findByIdAndUpdate + $push

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "Listing added", listing });
  } catch (error) {
    console.error("AddListing Error:", error);
    res.status(500).json({ message: `AddListing error: ${error.message}` });
  }
};
// GET /api/listing/get
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.find().sort({ createdAt: -1 }); // optional: latest first
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ message: "Failed to fetch listing", error: error.message });
  }
};

// controller
export const getMyListings = async (req, res) => {
  try {
    const userId = req.userId;
    const listings = await Listing.find({ host: userId }).sort({ createdAt: -1 });
    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listings", error: error.message });
  }
};


export const findListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listing", error: error.message });
  }
};



// controller


export const updateListing = async (req, res) => {
  try {
    const {id} = req.params;
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Updated", listing: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


export const findListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error finding listing", error: error.message });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    console.log("Logged-in user:", req.userId);        // ✅ LOG THIS
    console.log("Listing host:", listing.host);         // ✅ LOG THIS

    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting listing", error: err.message });
  }
};


export const getAllListingsWithBookingStatus = async (req, res) => {
  try {
    const listings = await Listing.find();

    const updatedListings = await Promise.all(
      listings.map(async (listing) => {
        const activeBooking = await Booking.findOne({
          listing: listing._id,
          status: "booked",
          checkOut: { $gte: new Date() }, // still active booking
        });

        return {
          ...listing._doc,
          isBooked: !!activeBooking,
        };
      })
    );

    res.status(200).json(updatedListings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings", error: err.message });
  }
};


export const searchListings = async (req, res) => {
  try {
    const { city, category, minRent, maxRent } = req.query;

    let filters = {};
    if (city) filters.city = { $regex: city, $options: "i" };
    if (category) filters.category = category;
    if (minRent || maxRent) {
      filters.rent = {};
      if (minRent) filters.rent.$gte = Number(minRent);
      if (maxRent) filters.rent.$lte = Number(maxRent);
    }

    const listings = await Listing.find(filters);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};



