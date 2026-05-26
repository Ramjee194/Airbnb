import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing", 
    required: true,
  },
 status: {
  type: String,
   enum: ["pending", "booked", "cancelled", "completed", "failed"],
  default: "pending",
},

  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalRent: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },
}, { timestamps: true }); 

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking; 
