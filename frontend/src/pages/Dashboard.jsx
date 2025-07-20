import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Nav from "../component/Nav";
import { userDataContext } from "../context/UserContext";
import DashboardCard from "../component/DashboardCard";

function Dashboard() {
  const { serverURl } = useContext(userDataContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get(`${"https://airbnb-chpu.onrender.com"}/api/dashboard/host`, { withCredentials: true })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard fetch failed:", err));
  }, []);

  if (!stats) return <p className="pt-32 px-6">Loading Dashboard...</p>;

  return (
    <div>
      <Nav />
      <div className="pt-28 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-bold">Host Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Total Listings" value={stats.totalListings} />
          <DashboardCard title="Total Bookings" value={stats.totalBookings} />
          <DashboardCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.listingStats.map((item) => (
              <div key={item._id} className="border p-4 rounded shadow">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p>Total Bookings: {item.bookings}</p>
                <p>Revenue: ₹{item.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
