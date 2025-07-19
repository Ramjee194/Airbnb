import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const { listingId, comment, rating } = req.body;
    const review = await Review.create({ listing: listingId, user: req.userId, comment, rating });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to add review", error: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const listingId = req.params.id;
    const reviews = await Review.find({ listing: listingId }).populate("user", "name");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};
