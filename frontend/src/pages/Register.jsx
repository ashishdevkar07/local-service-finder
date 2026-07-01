import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()

    function handleRegister() {
        if (name === "" || email === "" || password === "" || phone === "") {
            alert("Please fill all fields")
            return
        }
        alert("Registration Successful!")
        navigate("/login")
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