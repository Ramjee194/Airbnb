import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

function BookingPage() {
    const { listingId } = useParams();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { serverURl } = useContext(userDataContext);

    const handleBooking = async () => {
        
        if (!checkIn || !checkOut) {
            setMessage("Please select both check-in and check-out dates.");
            return;
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        if (checkInDate >= checkOutDate) {
            setMessage("Check-out must be after check-in.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${serverURl}/api/booking/create`,
                { listingId, checkIn, checkOut },
                { withCredentials: true }
            );
            setMessage("Booking successful!");
            setTimeout(() => navigate("/mybookings"), 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="p-8 max-w-xl mx-auto pt-32">
            <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Check-in Date:</label>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border p-2 rounded"
                    min={today}
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Check-out Date:</label>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border p-2 rounded"
                    min={checkIn || today}
                />
            </div>

            <button
                onClick={handleBooking}
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
            >
                {loading ? "Booking..." : "Confirm Booking"}
            </button>

            {message && (
                <p className={`mt-4 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default BookingPage;
