import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcRating } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function Card({ listing, ratings }) {
  const navigate = useNavigate();
  const { userData, serverURl } = useContext(userDataContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    title,
    location,
    price,
    image1,
    _id,
    city,
    landmark,
    description,
    image,
    isBooked   // Make sure isBooked exists in listing object
  } = listing;

  const handleView = () => {
    if (_id) navigate(`/listing/${_id}`);
    else if (listing.id) navigate(`/sample/${listing.id}`);
  };

  const handleBook = () => {
    if (_id) navigate(`/booking/${_id}`);
    else alert('Sample listing booking simulation!');
  };

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!userData?._id) return;
      try {
        const res = await axios.get(`${"https://airbnb-chpu.onrender.com"}/api/wishlist/mine`, { withCredentials: true });
        const wishlistedIds = res.data.favorites.map(item => item._id);
        setIsWishlisted(wishlistedIds.includes(listing._id));
      } catch (err) {
        console.error("Wishlist check failed:", err.message);
      }
    };
    fetchWishlistStatus();
  }, [userData, listing._id, "https://airbnb-chpu.onrender.com"]);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(`${"https://airbnb-chpu.onrender.com"}/api/wishlist/toggle/${_id}`, {}, { withCredentials: true });
      setIsWishlisted(prev => !prev);
    } catch (err) {
      console.error("Wishlist toggle failed:", err.message);
    }
  };

  return (
    <div
      onClick={handleView}
      className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer m-4"
    >
      {/* Image */}
      <div className="relative w-full h-60">
        <img
          src={image1 || image || listing.imageUrls?.[0] || 'https://via.placeholder.com/400'}
          alt={title}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {/* Wishlist Icon */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-1 text-xl text-rose-600 shadow hover:scale-110 transition"
        >
          {isWishlisted ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>

        {/* Booked Badge */}
        {isBooked && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
            <GiConfirmed className="text-white" />
            Booked
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-semibold text-gray-800 truncate">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FcRating />
            <span>{ratings || 4.5}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm truncate">{city} • {landmark}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{description?.slice(0, 60)}...</p>

        <p className="text-md text-rose-500 font-semibold mt-1">₹{price} <span className="text-sm font-normal text-gray-500">/ night</span></p>

        {/* Book Now Button */}
        <button
          className="mt-2 px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600"
            onClick={() => navigate("/listingPage1")}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Card;
