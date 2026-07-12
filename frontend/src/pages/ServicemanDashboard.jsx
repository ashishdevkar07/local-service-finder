import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "../config"

function ServicemanDashboard() {
    const [serviceman, setServiceman] = useState(null)
    const [available, setAvailable] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = localStorage.getItem("servicemanName")
    const status = localStorage.getItem("servicemanStatus")
    const token = localStorage.getItem("servicemanToken")

    useEffect(() => {
        if (!token) {
            navigate("/serviceman-login")
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem("servicemanToken")
        localStorage.removeItem("servicemanName")
        localStorage.removeItem("servicemanStatus")
        navigate("/")
    }

    async function toggleAvailability() {
        setAvailable(!available)
    }

    // Not logged in
    if (!token) {
        return null
    }

    // Pending Approval
    if (status === "pending") {
        return (
            <div style={{ textAlign: "center", marginTop: "100px", padding: "20px" }}>
                <div style={{ background: "white", maxWidth: "500px", margin: "0 auto", padding: "40px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(111,78,55,0.12)" }}>
                    <h2 style={{ color: "#3E2723", marginBottom: "16px" }}>⏳ Application Under Review</h2>
                    <p style={{ color: "#8B7355", lineHeight: "1.8" }}>
                        Hello <strong>{name}</strong>, your application has been submitted successfully.
                        Our admin team is reviewing your details. You will be notified once approved.
                    </p>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: "24px",
                            padding: "10px 24px",
                            background: "linear-gradient(135deg, #6F4E37, #C89B6D)",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif"
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    // Rejected 
    if (status === "rejected") {
        return (
            <div style={{ textAlign: "center", marginTop: "100px", padding: "20px" }}>
                <div style={{ background: "white", maxWidth: "500px", margin: "0 auto", padding: "40px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(111,78,55,0.12)" }}>
                    <h2 style={{ color: "#dc3545", marginBottom: "16px" }}>❌ Application Rejected</h2>
                    <p style={{ color: "#8B7355", lineHeight: "1.8" }}>
                        Sorry <strong>{name}</strong>, your application was not approved at this time.
                        Please contact support for more information.
                    </p>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: "24px",
                            padding: "10px 24px",
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif"
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    // Approved - show full dashboard
    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ background: "white", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 30px rgba(111,78,55,0.12)", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <h1 style={{ color: "#3E2723", marginBottom: "6px" }}>Welcome, {name}! 👋</h1>
                        <p style={{ color: "#8B7355" }}>✅ Your account is active and verified</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "8px 20px",
                            background: "transparent",
                            color: "#6F4E37",
                            border: "2px solid #6F4E37",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600"
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Availability Toggle */}
            <div style={{ background: "white", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 30px rgba(111,78,55,0.12)", marginBottom: "24px" }}>
                <h2 style={{ color: "#3E2723", marginBottom: "16px" }}>My Availability</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <p style={{ color: "#8B7355" }}>Current Status:</p>
                    <span style={{
                        padding: "6px 20px",
                        background: available ? "#D1FAE5" : "#FEE2E2",
                        color: available ? "#065F46" : "#991B1B",
                        borderRadius: "20px",
                        fontWeight: "700",
                        fontSize: "14px"
                    }}>
                        {available ? "✅ Available" : "❌ Not Available"}
                    </span>
                    <button
                        onClick={toggleAvailability}
                        style={{
                            padding: "8px 20px",
                            background: available ? "#dc3545" : "linear-gradient(135deg, #6F4E37, #C89B6D)",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600"
                        }}
                    >
                        {available ? "Set Unavailable" : "Set Available"}
                    </button>
                </div>
            </div>

            {/* Info Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: "white", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 15px rgba(111,78,55,0.08)", textAlign: "center" }}>
                    <h3 style={{ color: "#6F4E37", fontSize: "14px", marginBottom: "8px" }}>ACCOUNT STATUS</h3>
                    <p style={{ color: "#2d8a4e", fontWeight: "700", fontSize: "18px" }}>✅ Approved</p>
                </div>
                <div style={{ background: "white", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 15px rgba(111,78,55,0.08)", textAlign: "center" }}>
                    <h3 style={{ color: "#6F4E37", fontSize: "14px", marginBottom: "8px" }}>PLATFORM</h3>
                    <p style={{ color: "#3E2723", fontWeight: "700", fontSize: "18px" }}>Local Service Finder</p>
                </div>
            </div>
        </div>
    )
}

export default ServicemanDashboard