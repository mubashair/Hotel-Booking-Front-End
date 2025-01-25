import React, { useState } from 'react';
import api from '../api';

const BookingForm = () => {
    const [guestName, setGuestName] = useState('');
    const [hotelId, setHotelId] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomsBooked, setRoomsBooked] = useState('');
    // State variable for error messages
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();// Prevent form reload
        setErrorMessage(''); // Reset error message before making API call
        try {
            // API call to create a new booking
            const response = await api.post('api/hotels/booking', {
                guestName,
                hotelId,
                checkInDate,
                checkOutDate,
                roomsBooked,
            });
            alert(`Booking successful! Booking ID: ${response.data.id}`);
            setGuestName('');
            setHotelId('');
            setCheckInDate('');
            setCheckOutDate('');
            setRoomsBooked('');
        } catch (error) {
            // Handle errors returned by the API
            if(error.response?.status==404){
                //Hotel not found
                setErrorMessage("Hotel with given ID was not found");
            }else if(error.response?.status==500){
                setErrorMessage(error.response?.data?.error || "Not enough rooms available");

            }
            else{
                //General error message
                console.error('Error creating booking:', error);
                setErrorMessage(error.response?.data?.error || 'Failed to create booking.');
            }
            
        }
    };

    return (
        <div className="container my-4">
            <h2>Create Booking</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
                {/* Error message display */}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Guest Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hotel ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={hotelId}
                        onChange={(e) => setHotelId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Check-In Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Check-Out Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rooms Booked</label>
                    <input
                        type="number"
                        className="form-control"
                        value={roomsBooked}
                        onChange={(e) => setRoomsBooked(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Book</button>
            </form>
        </div>
    );
};

export default BookingForm;
