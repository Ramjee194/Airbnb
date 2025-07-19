import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import Card from '../component/Card';
import { userDataContext } from '../context/UserContext';

const CustomerDashboard = () => {
  const { serverURl } = useContext(userDataContext);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, wishlistRes] = await Promise.all([
          axios.get(`${serverURl}/api/bookings/my`, { withCredentials: true }),
          axios.get(`${serverURl}/api/wishlist`, { withCredentials: true }),
        ]);
        setBookings(bookingsRes.data);
        setWishlist(wishlistRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [serverURl]);

  return (
    <div className="bg-gradient-to-r from-purple-100 via-rose-50 to-pink-100 min-h-screen mt-10">
      <Nav />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-rose-600 mb-8 text-center">Customer Dashboard</h1>

        {loading ? (
          <div className="text-center text-rose-500">Loading your dashboard...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Bookings Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-rose-100">
              <h2 className="text-xl font-semibold text-purple-700 border-b border-purple-200 pb-2 mb-4">My Bookings</h2>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((b, i) => (
                    <div key={i} className="bg-rose-50 p-4 rounded-lg shadow-sm border border-rose-200">
                      <h3 className="font-bold text-rose-600">{b.listing.title}</h3>
                      <p className="text-sm text-gray-700">Check-in: {new Date(b.checkIn).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-700">Check-out: {new Date(b.checkOut).toLocaleDateString()}</p>
                      <p className="text-sm text-rose-500 font-semibold">₹{b.totalAmount}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You haven’t booked any listings yet.</p>
              )}
            </div>

            {/* Wishlist Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-rose-700 border-b border-rose-200 pb-2 mb-4">My Wishlist</h2>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item, i) => (
                    <Card key={i} listing={item.listing || item} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You haven’t added anything to your wishlist yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
