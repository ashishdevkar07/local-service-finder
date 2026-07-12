import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "../config"

function ServicemanRegister() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [category, setCategory] = useState("")
    const [experience, setExperience] = useState("")
    const [area, setArea] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    async function handleRegister() {
        if (!name || !email || !password || !phone || !category || !experience || !area || !price) {
            setError("Please fill all fields")
            return
        }

        try {
            setLoading(true)
            setError("")

            const response = await fetch(`${API_URL}/serviceman/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone, category, experience, area, price: Number(price) })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="auth-form">
                <h2 style={{ color: "#3E2723" }}>Application Submitted! ✅</h2>
                <p style={{ color: "#8B7355", marginTop: "10px" }}>
                    Your registration has been submitted for admin approval.
                    You will be notified once approved.
                </p>
                <button onClick={() => navigate("/")}>Go to Home</button>
            </div>
        )
    }

    return (
        <div className="auth-form">
            <h1>Register as Service Provider</h1>
            <p style={{ color: "#8B7355", fontSize: "14px", marginBottom: "10px" }}>
                Join our platform and start earning
            </p>

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Your Service Category</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painting">Painting</option>
                <option value="AC Repair">AC Repair</option>
            </select>

            <input type="text" placeholder="Years of Experience (e.g. 5 years)" value={experience} onChange={(e) => setExperience(e.target.value)} />
            <input type="text" placeholder="Service Area (e.g. Pune, Maharashtra)" value={area} onChange={(e) => setArea(e.target.value)} />
            <input type="number" placeholder="Price per hour (₹)" value={price} onChange={(e) => setPrice(e.target.value)} />

            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
            </button>

            <p>Already registered? <span onClick={() => navigate("/serviceman-login")} className="link">Login here</span></p>
        </div>
    )
}

export default ServicemanRegister