import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("listings", "title image1 image2 image3 description rent category city landMark");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: `Profile error: ${err.message}` });
  }
};


// in /controllers/user.controller.js
export const getHostStats = async (req, res) => {
  try {
    const userId = req.userId;

    // ✅ First fetch all listings by this user
    const listings = await Listing.find({ owner: userId });

    // ✅ Count all bookings on those listings
    const totalBookings = await Booking.countDocuments({
      listing: { $in: listings.map((list) => list._id) }
    });

    // ✅ Calculate total earnings
    const bookings = await bookings.find({
      listing: { $in: listings.map((list) => list._id) }
    });

    const earnings = bookings.reduce((acc, curr) => acc + curr.totalAmount, 0);

    return res.status(200).json({
      totalBookings,
      earnings,
      listings,
    });
  } catch (error) {
    console.error("Error in getHostStats:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};