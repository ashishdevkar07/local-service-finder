import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "../config"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false) //Shows "Registering..." on button while request is in progress. Prevents double clicking.
    const [error, setError] = useState("") // Stores error message from backend. Shows it on screen instead of just alert.
    const navigate = useNavigate()


    async function handleRegister() {
        // Validation
        if (name === "" || email === "" || password === "" || phone === "") {
            alert("Please fill all fields")
            return
        }

        try {
            setLoading(true)
            setError("")
            /* 
            method: "POST" — sending data, not getting data
            headers — telling backend "I'm sending JSON"
            body: JSON.stringify(...) — converting JS object to JSON string to send
            if(response.ok)
                response.ok is true when status is 200-299. If backend sends error — it's false.
            finally { setLoading(false) }
                Always runs after try/catch — whether success or error. Always stops loading.
            */
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, phone })
            })

            const data = await response.json()

            if (response.ok) {
                alert("Registration successful! Please Login")
                navigate("/login")
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError("Something went wrong, Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-form">
            <h1>Create Account</h1>
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <button onClick={handleRegister}>Register</button>
            <p>Already have an acoount? <span onClick={() => navigate("/login")} className="link">Login here</span></p>
        </div>
    )
}

export default Register