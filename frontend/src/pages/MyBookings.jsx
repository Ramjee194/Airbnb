import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import Nav from '../component/Nav';

function MyBookings() {
    const { serverURl } = useContext(userDataContext);
    const [bookings, setBookings] = useState([]);

    const handleCancel = async (id) => {
        try {
            await axios.put(`${serverURl}/api/booking/cancel/${id}`, {}, {
                withCredentials: true,
            });
            setBookings(prev => prev.map(b => b._id === id ? { ...b, status: "cancelled" } : b));
        } catch (err) {
            console.error("Cancel failed:", err.message);
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${serverURl}/api/booking/my`, {
                    withCredentials: true,
                });

                // ✅ Make sure to access res.data.bookings (not just res.data)
                setBookings(res.data.bookings || []);
            } catch (error) {
                console.error("Booking fetch failed:", error.message);
            }
        };
        fetchBookings();
    }, [serverURl]);

    return (
        <div>
            <Nav />
            <div className=" items-center justify-center w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto   pt-32  mt-16">
                <h2 className=" flex text-2xl  items-center justify-center font-bold mb-4">My Bookings</h2>
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <div className="flex  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookings.map((booking, index) => (
                            <div key={index} className="border p-4 rounded shadow bg-white">
                                <img src={booking?.listing?.image1} alt="listing" className="w-full h-40 object-cover rounded mb-2" />
                                <h3 className="font-semibold text-lg">{booking?.listing?.title}</h3>
                                <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                                <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                                <p>Total Rent: ₹{booking.totalRent}</p>
                                <p>Status: {booking.status}</p>
                                <p>
                                    Nights: {
                                        Math.ceil(
                                            (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)
                                        )
                                    }
                                </p>
                                {booking.status === 'booked' && (
                                    <button
                                        onClick={() => handleCancel(booking._id)}
                                        className="text-red-500 hover:underline mt-2"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBookings;
