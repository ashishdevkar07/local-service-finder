import { useState, useEffect } from "react";
import API_URL from "../config"
import StarRating from "../components/StarRating"

function BookingHistory() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const userEmail = localStorage.getItem("userEmail")

    useEffect(() => {
        if (!userEmail) {
            setError("Please login to view bookings")
            setLoading(false)
            return
        }

        fetch(`${API_URL}/bookings/user?email=${encodeURIComponent(userEmail)}`)
            .then(res => res.json())
            .then(data => {
                console.log("Booking data:" ,data)
                setBookings(data)
                setLoading(false)
            })
            .catch(err => {
                setError("Failed to load bookings")
                setLoading(false)
            })
    }, [])

    function handleRated(bookingId) {
        setBookings(bookings.map(b =>
            b._id === bookingId ? { ...b, isRated: true } : b
        ))

        fetch(`${API_URL}/bookings//${bookingId}/rated`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        })
    }

    if (loading) {
        return <h2 style={{ textAlign: "center", marginTop: "50px", color: "#6F4E37" }}>Loading your bookings...</h2>
    }
    if (error) {
        return <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}> {error}</h2>
    }
    if (bookings.length == 0) {
        return <h2 style={{ textAlign: "center", marginTop: "50px", color: "#6F4E37" }}>No bookings found. Book a service first!</h2>
    }

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
            <h1 style={{ color: "#3E2723", marginBottom: "30px", textAlign: "center" }}>My Bookings</h1>

            {bookings.map((booking) => (
                <div key={booking.id} className="booking-history-card">
                    <div className="booking-history-heading">
                        <h3>{booking.serviceType}</h3>
                        <span className={`status-badge status-${booking.status}`}>
                            {booking.status.toUpperCase()}
                        </span>
                    </div>

                    <div className="booking-history-details">
                        <p>👤 Name: {booking.name}</p>
                        <p>📞 Phone: {booking.phone}</p>
                        <p>📍 Address: {booking.address}</p>
                        <p>📅 Date: {booking.date}</p>
                        <p>🕐 Time: {booking.time}</p>
                        <p>🕐 Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>

                    {booking.status === "completed" && !booking.isRated && (
                        <div style={{ marginTop: "12px" }}>
                            <p style={{ color: "#6F4E37", fontWeight: "600", marginBottom: "6px" }}>
                                Rate this service:
                            </p>
                            <StarRating
                                providerId={booking.providerId}
                                currentRating={0}
                                onRated={() => handleRated(booking._id)}
                            />
                        </div>
                    )}
                    {booking.isRated && (
                        <p style={{ color: "#C89B6D", marginTop: "10px", fontWeight: "600" }}>
                            ✅ You have rated this service
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default BookingHistory