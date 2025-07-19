import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
});

export default mongoose.model('Wishlist', wishlistSchema);
