import mongoose from "mongoose";

export const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: false,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: false,
  },
  image3: {
    type: String,
    required: false,
  },
  rent: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  landMark: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  isBooked: {
    type: Boolean,
    default: false, // ✅ Spelling fix: "default" not "dafault"
  },
  booking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing", // ✅ You may want to link "Booking" model here, not "Listing" itself
    },
  ],
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
