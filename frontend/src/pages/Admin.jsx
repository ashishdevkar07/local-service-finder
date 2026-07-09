import { useState, useEffect } from "react"
import API_URL from "../config"

function Admin() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`${API_URL}/bookings`)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
                setLoading(false)
            })
            .catch(err => {
                setError("Failed to load bookings")
                setLoading(false)
            })
    }, [])

    async function updateStatus(bookingId, newStatus) {
        try {
            const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            })

            if (response.ok) {
                setBookings(bookings.map(b =>
                    b._id === bookingId ? { ...b, status: newStatus } : b
                ))
            }
        } catch (err) {
            console.log("Status update error:", err)
        }
    }

    if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px", color: "#6F4E37" }}>Loading...</h2>
    if (error) return <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}>{error}</h2>

    return (
        <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
            <h1 style={{ color: "#3E2723", marginBottom: "10px", textAlign: "center" }}>
                Admin Dashboard
            </h1>
            <p style={{ textAlign: "center", color: "#8B7355", marginBottom: "30px" }}>
                Total Bookings: {bookings.length}
            </p>

            {bookings.length === 0 && (
                <h3 style={{ textAlign: "center", color: "#6F4E37" }}>No bookings yet</h3>
            )}

            {bookings.map((booking) => (
                <div key={booking._id} className="booking-history-card">
                    <div className="booking-history-header">
                        <h3>{booking.serviceType}</h3>
                        <span className={`status-badge status-${booking.status}`}>
                            {booking.status.toUpperCase()}
                        </span>
                    </div>

                    <div className="booking-history-details">
                        <p>👤 Customer: {booking.name}</p>
                        <p>📧 Email: {booking.userEmail || "N/A"}</p>
                        <p>📞 Phone: {booking.phone}</p>
                        <p>📍 Address: {booking.address}</p>
                        <p>📅 Date: {booking.date}</p>
                        <p>🕐 Time: {booking.time}</p>
                        <p>📝 Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                        <button
                            onClick={() => updateStatus(booking._id, "completed")}
                            disabled={booking.status === "completed"}
                            style={{
                                padding: "8px 20px",
                                background: booking.status === "completed" ? "#ccc" : "linear-gradient(135deg, #6F4E37, #C89B6D)",
                                color: "white",
                                border: "none",
                                borderRadius: "20px",
                                cursor: booking.status === "completed" ? "not-allowed" : "pointer",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                                fontSize: "13px"
                            }}
                        >
                            ✅ Mark Completed
                        </button>

                        <button
                            onClick={() => updateStatus(booking._id, "cancelled")}
                            disabled={booking.status === "cancelled"}
                            style={{
                                padding: "8px 20px",
                                background: booking.status === "cancelled" ? "#ccc" : "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "20px",
                                cursor: booking.status === "cancelled" ? "not-allowed" : "pointer",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                                fontSize: "13px"
                            }}
                        >
                            ❌ Cancel Booking
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Admin