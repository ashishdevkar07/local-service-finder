import { useState } from "react";
import { useNavigate } from "react-router-dom"

function AdminLogin() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleAdminLogin() {
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("isAdmin", "true")
            navigate("/admin")
        } else {
            setError("Invalid admin credentials")
        }
    }

    return (
        <div className="auth-form">
            <h1>Admin Login</h1>
            <p style={{ color: "#8B7355", marginBottom: "10px", fontSize: "14px" }}>
                Restricted access - admin only
            </p>

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <input
                type="text"
                placeholder="Admin Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />

            <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleAdminLogin}>Login as Admin</button>
        </div>
    )
}

export default AdminLogin