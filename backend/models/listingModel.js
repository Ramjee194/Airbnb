import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  country: String,
  city: String,
  address: String,
  guestCount: Number,
  bedroomCount: Number,
  bathroomCount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing;
