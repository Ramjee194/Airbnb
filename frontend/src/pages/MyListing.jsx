import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';
import Nav from '../component/Nav';
import Card from '../component/Card';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function MyListings() {
  const { userData, serverURl } = useContext(userDataContext);
  const { setFilteredListing } = useContext(listingDataContext);
  const [myListings, setMyListings] = useState([]);
  const navigate = useNavigate();

  const fetchMyListings = async () => {
    try {
      const res = await axios.get(`${serverURl}/api/listing/mylistings`, {
        withCredentials: true,
      });
      setMyListings(res.data.listings); // Assuming server returns array of listings
      setFilteredListing(res.data); // Optional global update
    } catch (err) {
      console.error("Failed to fetch my listings:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchMyListings();
    } else {
      navigate("/login");
    }
  }, [userData]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />

      <div className="pt-44 px-4">
        <div
          className="mb-4 flex items-center text-red-500 cursor-pointer w-fit"
          onClick={() => navigate("/listingpage1")}
        >
          <FaArrowLeftLong className="mr-2" />
          <span>Back to Listing Page</span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">My Listings</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {myListings.length > 0 ? (
            myListings.map((listing, index) =>
              ['image1', 'image2', 'image3'].map((imgKey) =>
                listing[imgKey] ? (
                  <Card
                    key={`${listing._id}-${imgKey}`}
                    listing={{ ...listing, image: listing[imgKey] }}
                  />
                ) : null
              )
            )
          ) : (
            <span>
            <p className="text-center text-gray-500">You have no listings yet.</p>
             <h1 className='text-xl  text-red-400'>create a listing Go to listingPage1</h1>
           </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyListings;
