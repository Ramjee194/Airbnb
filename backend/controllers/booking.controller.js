import Booking from "../models/booking.js";
import Listing from "../models/listing.model.js";

export const createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut } = req.body;
    const guestId = req.userId;

    const existingBooking = await Booking.findOne({
      listing: listingId,
      status: "booked",
      $or: [
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } // overlap logic
      ]
    });

    if (existingBooking) {
      return res.status(409).json({ message: "This listing is already booked for the selected dates." });
    }

    const listing = await Listing.findById(listingId).populate("host");

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalRent = days * listing.rent;

    const newBooking = new Booking({
      host: listing.host._id,
      guest: guestId,
      listing: listingId,
      checkIn,
      checkOut,
      totalRent
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });

  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.userId }).populate("listing");
    
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Failed to get bookings", error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Cancel request for booking ID:", id);

    const booking = await Booking.findById(id);
    console.log("Found booking:", booking);

    console.log("Request user ID:", req.userId);
    if (!booking || booking.guest.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized or booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled" });

  } catch (err) {
    console.error("Cancel booking error:", err);
    res.status(500).json({ message: "Cancel failed", error: err.message });
  }
};



export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("listing");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ booking });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch booking", error: err.message });
  }
};


export const isListingBooked = async (req, res) => {
  try {
    const { listingId } = req.query;
    const booking = await Booking.findOne({
      listing: listingId,
      status: "booked",
      checkOut: { $gte: new Date() },
    });

    res.status(200).json({ isBooked: !!booking });
  } catch (err) {
    res.status(500).json({ message: "Check failed", error: err.message });
  }
};


