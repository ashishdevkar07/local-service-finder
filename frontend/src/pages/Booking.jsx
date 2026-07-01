import { useState } from "react"

function Booking() {
    const [name, SetName] = useState("")
    const [phone, Setphone] = useState("")
    const [address, setAddress] = useState("")
    const [serviceType, setServiceType] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [submitted, setSubmitted] = useState(false)

    function handleSubmit() {
        if (name === "" || phone === "" || address === "" || serviceType === "" || date === "" || time === "") {
            alert("Please fill all the details")
            return
        }
        setSubmitted(true)
    }

    function handleReset() {
        SetName("")
        Setphone("")
        setAddress("")
        setServiceType("")
        setDate("")
        setTime("")
        setSubmitted(false)
    }

    if (submitted) {
        return (
            <div className="booking-success">
                <h2>Booking Confirmed!</h2>
                <p>Name : {name}</p>
                <p>Phone : {phone}</p>
                <p>Address :{address}</p>
                <p>Service : {serviceType}</p>
                <p>Date : {date}</p>
                <p>Time : {time}</p>
                <button onClick={handleReset}>Book Another Services</button>
            </div>
        )
    }

    return (
        <div className="booking-form">
            <h1>Book a Service</h1>

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

            <button onClick={handleSubmit}>Confirm Booking</button>
        </div>
    )
}

export default Booking