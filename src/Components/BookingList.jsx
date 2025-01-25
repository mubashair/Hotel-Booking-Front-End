import React, { useState, useEffect } from 'react';
import api from '../api';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('api/hotels/bookings');
                setBookings(response.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError(err.response?.data?.error || 'Failed to fetch bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="container my-4">
            <h2>Booking List</h2>
            {loading && <p>Loading bookings...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && bookings.length === 0 && <p>No bookings found.</p>}

            {!loading && bookings.length > 0 && (
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Guest Name</th>
                            <th>Hotel Name</th>
                            <th>City</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Rooms Booked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.guestName}</td>
                                <td>{booking.hotelName}</td>
                                <td>{booking.city}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.roomsBooked}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingList;
