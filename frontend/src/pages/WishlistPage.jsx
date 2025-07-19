import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const WishlistPage = () => {
  const { serverURl } = useContext(userDataContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${serverURl}/api/wishlist`, { withCredentials: true })
      .then(res => setListings(res.data));
  }, []);

  return (
    <div className="pt-24 px-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {listings.map(listing => (
          <div key={listing._id} className="border p-4 rounded">
            <img src={listing.image1} className="h-40 w-full object-cover rounded" />
            <h3 className="mt-2 text-lg font-semibold">{listing.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
