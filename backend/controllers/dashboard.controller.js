import Listing from "../models/listing.model.js";
import Booking from "../models/booking.js";

export const getHostDashboard = async (req, res) => {
  try {
    const hostId = req.userId;

    const listings = await Listing.find({ host: hostId });
    const listingIds = listings.map((l) => l._id);

    const bookings = await Booking.find({ listing: { $in: listingIds } });

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalRent || b.totalAmount || 0), 0);

    const listingStats = listings.map((l) => {
      const lBookings = bookings.filter((b) => b.listing.toString() === l._id.toString());
      const revenue = lBookings.reduce((sum, b) => sum + (b.totalRent || b.totalAmount || 0), 0);
      return {
        _id: l._id,
        title: l.title,
        image1: l.image1,
        image2: l.image2,
        image3: l.image3,
        rent: l.rent,
        city: l.city,
        landMark: l.landMark,
        category: l.category,
        bookings: lBookings.length,
        revenue,
      };
    });

    res.status(200).json({
      totalListings: listings.length,
      totalBookings: bookings.length,
      totalRevenue,
      listingStats,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard", error: err.message });
  }
};
