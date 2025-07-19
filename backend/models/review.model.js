import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
