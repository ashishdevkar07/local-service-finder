import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "../config"

function Login({ setIsLoggedIn, setUsername }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handlelogin() {
        if (email === "" || password === "") {
            alert("Please fill all the fields")
            return
        }
        try {
            setLoading(true)
            setError("")

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                // save token to localStorage

                /*
                localStorage.setItem("token", data.token) — saves JWT token in browser storage so user stays logged in even after page refresh.
                localStorage.setItem("username", data.user.name) — saves username for display in navbar.
                Login now uses real email and password — not just any username.
                */
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", data.user.name)

                setIsLoggedIn(true)
                setUsername(data.user.name)
                navigate("/home")
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-form">
            <h1>Welcome Back</h1>

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

            <button onClick={handlelogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
                </button>
            <p>Don't have an account ? <span onClick={() => navigate("/register")} className="link">Register here</span></p>
        </div>
    )
}

export default Login