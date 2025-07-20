import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Nav from "../component/Nav";
import { userDataContext } from "../context/UserContext";

const HostDashboard = () => {
  const { serverURl } = useContext(userDataContext);
  const [data, setData] = useState({
    totalBookings: 0,
    earnings: 0,
    listings: [],
  });

  useEffect(() => {
    axios
      .get(`${"https://airbnb-chpu.onrender.com"}/api/bookings/stats`, { withCredentials: true })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Dashboard data fetch failed", err));
  }, [serverURl]);

  return (
    <div className="bg-gray-50 min-h-screen mt-14">
      <Nav />
      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800"> My Host Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Bookings</h2>
            <p className="text-3xl font-bold text-rose-500">{data.totalBookings}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Earnings</h2>
            <p className="text-3xl font-bold text-green-600">₹{data.earnings}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-gray-800">My Listings</h2>
        {data.listings.length === 0 ? (
          <p className="text-gray-500">You haven’t listed any properties yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {data.listings.map((item) => (
              <div key={item._id} className="bg-white border rounded shadow p-4">
                <img
                  src={item.image1}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.city}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
