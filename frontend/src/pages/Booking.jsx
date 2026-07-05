import { useState } from "react"
import API_URL from "../config"

function Booking() {
    const [name, SetName] = useState("")
    const [phone, Setphone] = useState("")
    const [address, setAddress] = useState("")
    const [serviceType, setServiceType] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit() {
        if (name === "" || phone === "" || address === "" || serviceType === "" || date === "" || time === "") {
            alert("Please fill all the details")
            return
        }
        try {
            setLoading(true)
            setError("")

            const response = await fetch(`${API_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone, address, serviceType, date, time })
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitted(true)
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    function handleReset() {
        SetName("")
        Setphone("")
        setAddress("")
        setServiceType("")
        setDate("")
        setTime("")
        setSubmitted(false)
        setError("")
    }

    if (submitted) {
        return (
            <div className="booking-success">
                <h2>Booking Confirmed! ✅</h2>
                <p>Name : {name}</p>
                <p>Phone : {phone}</p>
                <p>Address :{address}</p>
                <p>Service : {serviceType}</p>
                <p>Date : {date}</p>
                <p>Time : {time}</p>
                <p style={{ color: "#1abc9c", fontWeight: "600" }}>
                    Your booking has been saved successfully!
                </p>
                <button onClick={handleReset}>Book Another Services</button>
            </div>
        )
    }

    return (
        <div className="booking-form">
            <h1>Book a Service</h1>

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => SetName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => Setphone(e.target.value)}
            />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="">Select Service Type</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painting">Painting</option>
            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
            </button>
        </div>
    )
}

export default Booking