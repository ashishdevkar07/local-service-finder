import { useState, useEffect } from "react"
import API_URL from "../config"

function Admin() {
    const [bookings, setBookings] = useState([])
    const [servicemen, setServicemen] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("bookings")

    const isAdmin = localStorage.getItem("isAdmin")

    if(!isAdmin) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h2 style={{ color: "#3E2723" }}>Access Denied</h2>
                <p style={{ color: "#8B7355", marginTop: "10px" }}>You must be an admin to view this page.</p>
                <button
                    onClick={() => window.location.href = "/admin-login"}
                    style={{
                        marginTop: "20px",
                        padding: "10px 24px",
                        background: "linear-gradient(135deg, #6F4E37, #C89B6D)",
                        color: "white",
                        border: "none",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontFamily: "Poppins, sans-serif"
                    }}
                >
                    Go to Admin Login
                </button>
            </div>
        )
    }

    useEffect(() => {
        // Fetch all bookings
        fetch(`${API_URL}/bookings`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.log(err))

        // Fetch all servicemen
        fetch(`${API_URL}/serviceman`)
            .then(res => res.json())
            .then(data => setServicemen(data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    async function updateBookingStatus(bookingId, newStatus) {
        try {
            const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            })
            if(response.ok) {
                setBookings(bookings.map(b =>
                    b._id === bookingId ? { ...b, status: newStatus } : b
                ))
            }
        } catch(err) {
            console.log(err)
        }
    }

    async function updateServicemanStatus(id, newStatus) {
        try {
            const response = await fetch(`${API_URL}/serviceman/${id}/${newStatus}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            if(response.ok) {
                setServicemen(servicemen.map(s =>
                    s._id === id ? { ...s, status: newStatus } : s
                ))
            }
        } catch(err) {
            console.log(err)
        }
    }

    if(loading) return <h2 style={{ textAlign: "center", marginTop: "50px", color: "#6F4E37" }}>Loading...</h2>

    return (
        <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
            <h1 style={{ color: "#3E2723", textAlign: "center", marginBottom: "10px" }}>Admin Dashboard</h1>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "30px" }}>
                <div style={{ background: "white", padding: "20px 30px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 15px rgba(111,78,55,0.08)" }}>
                    <h2 style={{ color: "#6F4E37", fontSize: "36px" }}>{bookings.length}</h2>
                    <p style={{ color: "#8B7355" }}>Total Bookings</p>
                </div>
                <div style={{ background: "white", padding: "20px 30px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 15px rgba(111,78,55,0.08)" }}>
                    <h2 style={{ color: "#6F4E37", fontSize: "36px" }}>{servicemen.filter(s => s.status === "pending").length}</h2>
                    <p style={{ color: "#8B7355" }}>Pending Approvals</p>
                </div>
                <div style={{ background: "white", padding: "20px 30px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 15px rgba(111,78,55,0.08)" }}>
                    <h2 style={{ color: "#6F4E37", fontSize: "36px" }}>{servicemen.filter(s => s.status === "approved").length}</h2>
                    <p style={{ color: "#8B7355" }}>Active Providers</p>
                </div>
                <div style={{ background: "white", padding: "20px 30px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 15px rgba(111,78,55,0.08)" }}>
                    <h2 style={{ color: "#6F4E37", fontSize: "36px" }}>{bookings.filter(b => b.status === "completed").length}</h2>
                    <p style={{ color: "#8B7355" }}>Completed</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
                <button
                    onClick={() => setActiveTab("bookings")}
                    style={{
                        padding: "10px 24px",
                        background: activeTab === "bookings" ? "linear-gradient(135deg, #6F4E37, #C89B6D)" : "white",
                        color: activeTab === "bookings" ? "white" : "#6F4E37",
                        border: "2px solid #C89B6D",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "600"
                    }}
                >
                    All Bookings ({bookings.length})
                </button>
                <button
                    onClick={() => setActiveTab("servicemen")}
                    style={{
                        padding: "10px 24px",
                        background: activeTab === "servicemen" ? "linear-gradient(135deg, #6F4E37, #C89B6D)" : "white",
                        color: activeTab === "servicemen" ? "white" : "#6F4E37",
                        border: "2px solid #C89B6D",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "600"
                    }}
                >
                    Service Providers ({servicemen.length})
                </button>
            </div>

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
                <div>
                    {bookings.length === 0 && <p style={{ textAlign: "center", color: "#8B7355" }}>No bookings yet</p>}
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
                                <p>📅 Date: {booking.date} at {booking.time}</p>
                                <p>📝 Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                                <button
                                    onClick={() => updateBookingStatus(booking._id, "completed")}
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
                                    onClick={() => updateBookingStatus(booking._id, "cancelled")}
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
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Servicemen Tab */}
            {activeTab === "servicemen" && (
                <div>
                    {servicemen.length === 0 && <p style={{ textAlign: "center", color: "#8B7355" }}>No applications yet</p>}
                    {servicemen.map((s) => (
                        <div key={s._id} className="booking-history-card">
                            <div className="booking-history-header">
                                <h3>{s.name}</h3>
                                <span className={`status-badge status-${s.status}`}>
                                    {s.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="booking-history-details">
                                <p>📧 Email: {s.email}</p>
                                <p>📞 Phone: {s.phone}</p>
                                <p>🔧 Category: {s.category}</p>
                                <p>⏳ Experience: {s.experience}</p>
                                <p>📍 Area: {s.area}</p>
                                <p>💰 Price: ₹{s.price}/hour</p>
                                <p>📝 Applied on: {new Date(s.createdAt).toLocaleDateString()}</p>
                            </div>
                            {s.status === "pending" && (
                                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                                    <button
                                        onClick={() => updateServicemanStatus(s._id, "approve")}
                                        style={{
                                            padding: "8px 20px",
                                            background: "linear-gradient(135deg, #6F4E37, #C89B6D)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            fontFamily: "Poppins, sans-serif",
                                            fontWeight: "600",
                                            fontSize: "13px"
                                        }}
                                    >
                                        ✅ Approve
                                    </button>
                                    <button
                                        onClick={() => updateServicemanStatus(s._id, "reject")}
                                        style={{
                                            padding: "8px 20px",
                                            background: "#dc3545",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            fontFamily: "Poppins, sans-serif",
                                            fontWeight: "600",
                                            fontSize: "13px"
                                        }}
                                    >
                                        ❌ Reject
                                    </button>
                                </div>
                            )}
                            {s.status === "approved" && (
                                <p style={{ color: "#2d8a4e", marginTop: "10px", fontWeight: "600" }}>✅ Approved — Active on platform</p>
                            )}
                            {s.status === "rejected" && (
                                <p style={{ color: "#dc3545", marginTop: "10px", fontWeight: "600" }}>❌ Application Rejected</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Admin