import Wishlist from "../models/wishlist.model.js";

// Toggle wishlist
export const toggleWishlist = async (req, res) => {
  const user = req.userId;
  const { listingId } = req.body;

  const existing = await Wishlist.findOne({ user, listing: listingId });

  if (existing) {
    await existing.deleteOne();
    return res.json({ message: "Removed from wishlist" });
  }

  await Wishlist.create({ user, listing: listingId });
  res.json({ message: "Added to wishlist" });
};

// ✅ Get logged-in user's wishlist
export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const wishlist = await Wishlist.find({ user: userId }).populate("listing");

    const favorites = wishlist.map(item => item.listing); // Correct extraction

    res.status(200).json({ favorites }); // ✅ Consistent format
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: err.message });
  }
};
