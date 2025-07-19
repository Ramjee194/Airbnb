import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import Nav from '../component/Nav';
import { FaArrowLeftLong } from 'react-icons/fa6';

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { serverURl } = useContext(userDataContext);
  const [listing, setListing] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  // Fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`${serverURl}/api/listing/findlistingbyid/${id}`, {
          withCredentials: true
        });
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err.message);
      }
    };
    fetchListing();
  }, [id, serverURl]);

  // Check booking status after listing is loaded
  useEffect(() => {
    if (listing && listing._id) {
      axios
        .get(`${serverURl}/api/booking/check?listingId=${listing._id}`, {
          withCredentials: true
        })
        .then((res) => setIsBooked(res.data.isBooked))
        .catch((err) => console.error("Booking check failed:", err.message));
    }
  }, [listing, serverURl]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${serverURl}/api/listing/delete/${id}`, {
        withCredentials: true
      });
      navigate("/mylistings");
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  if (!listing) return <p className="p-6">Loading listing...</p>;

  return (
    <div>
      <Nav />
      <div className="pt-28 px-4 mt-20 max-w-5xl mx-auto space-y-4">
        <FaArrowLeftLong
          onClick={() => navigate("/mylistings")}
          className="cursor-pointer text-xl text-gray-600 hover:text-black"
        />

        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-gray-700">{listing.description}</p>

        <p className="text-lg font-semibold text-rose-500">₹ {listing.rent}</p>
        <p className="text-sm text-gray-600">{listing.city}, {listing.landMark}</p>
        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{listing.category}</span>
        </p>

        {/* Image Gallery with Booked Badge */}
        <div className="flex flex-wrap gap-4 mt-4">
          {[listing.image1, listing.image2, listing.image3].map((img, idx) => (
            img && (
              <div key={idx} className="relative w-full sm:w-[45%] md:w-[30%]">
                <img
                  src={img}
                  alt="listing"
                  className="h-40 object-cover rounded shadow-sm w-full"
                />
                {isBooked && idx === 0 && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Booked
                  </div>
                )}
              </div>
            )
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg font-semibold">₹{listing.rent} / night</p>

          {!isBooked ? (
            <div className="flex items-center gap-4">
              <img
                src={listing.image1}
                alt="Primary"
                className="w-32 h-24 object-cover rounded border"
              />
              <button
                onClick={() => navigate(`/book/${listing._id}`)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/editlistings/${id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
