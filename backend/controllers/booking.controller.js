import Booking from "../models/booking.js";
import Listing from "../models/listing.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Skz3bTODSoFn0q",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "vYxuBCNYDXgZY1CwfMftQfQ6"
});

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
      totalRent,
      status: "pending"
    });

    await newBooking.save();

    // Create Razorpay Order
    const options = {
      amount: totalRent * 100, // paise
      currency: "INR",
      receipt: `receipt_booking_${newBooking._id}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    newBooking.razorpayOrderId = razorpayOrder.id;
    await newBooking.save();

    res.status(201).json({
      message: "Booking initiated",
      booking: newBooking,
      razorpayOrder
    });

  } catch (err) {
    console.error("Create booking payment error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "vYxuBCNYDXgZY1CwfMftQfQ6")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      booking.status = "booked";
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      await booking.save();

      res.status(200).json({ message: "Payment verified successfully", success: true });
    } else {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.status = "failed";
        await booking.save();
      }
      res.status(400).json({ message: "Payment verification failed", success: false });
    }
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ message: "Verification failed", error: err.message });
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
    const booking = await Booking.findById(id);

    if (!booking || booking.guest.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized or booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled" });
  } catch (err) {
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
    const { listingId, checkIn, checkOut } = req.query;
    
    let query = {
      listing: listingId,
      status: "booked"
    };

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      query.$or = [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
      ];
    } else {
      query.checkOut = { $gte: new Date() };
    }

    const booking = await Booking.findOne(query);
    res.status(200).json({ isBooked: !!booking });
  } catch (err) {
    res.status(500).json({ message: "Check failed", error: err.message });
  }
};


