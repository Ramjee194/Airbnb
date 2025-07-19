import React, { useContext } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const WishlistButton = ({ listingId, isWishlisted, refresh }) => {
  const { serverURl } = useContext(userDataContext);

  const toggleWishlist = async () => {
    await axios.post(`${serverURl}/api/wishlist/toggle`, { listingId }, { withCredentials: true });
    refresh();
  };

  return (
    <button onClick={toggleWishlist} className="text-red-500">
      {isWishlisted ? "❤️" : "🤍"}
    </button>
  );
};

export default WishlistButton;
