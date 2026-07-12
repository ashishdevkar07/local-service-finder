import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "../config";

function ServicemanLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleLogin() {
        if (email === "" || password === "") {
            setError("Please fill all the details")
            return
        }
        try {
            setLoading(true)
            setError("")

            const response = await fetch(`${API_URL}/serviceman/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("servicemanToken", data.token)
                localStorage.setItem("servicemanName", data.serviceman.name)
                localStorage.setItem("servicemanStatus", data.serviceman.status)
                navigate("/serviceman-dashboard")
            } else {
                setError(data.message)
            }
        } catch (err) {
            console.log("Catch error:", err)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-form">
            <h1>Service Provider Login</h1>

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <p>Don't have account? <span onClick={() => navigate("/serviceman-register")} className="link">Register here</span></p>
        </div>
    )
}

export default ServicemanLogin
