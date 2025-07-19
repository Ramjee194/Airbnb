import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/booking/details/${id}`, { withCredentials: true })
      .then((res) => setBooking(res.data.booking))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!booking) return <p className="p-6">Loading booking details...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <p className="mb-2"><strong>Title:</strong> {booking.listing.title}</p>
      <p className="mb-2"><strong>Check-in:</strong> {new Date(booking.checkIn).toDateString()}</p>
      <p className="mb-2"><strong>Check-out:</strong> {new Date(booking.checkOut).toDateString()}</p>
      <p className="mb-2"><strong>Rent:</strong> ₹{booking.totalRent}</p>
      <p className="mb-2"><strong>Status:</strong> {booking.status}</p>
    </div>
  );
}

export default BookingDetails;
