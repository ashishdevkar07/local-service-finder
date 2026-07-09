import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import API_URL from "../config"
import StarRating from '../components/StarRating'

function Services() {
    const [providers, setProviders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${API_URL}/providers`)
            .then(res => res.json())
            .then(data => {
                setProviders(data)
                setLoading(false)
            })
            .catch(err => {
                setError("Failed to load providers")
                setLoading(false)
            })
    }, [])

    function updateProviderRating(id, newRating) {
        setProviders(providers.map(p =>
            p._id === id ? { ...p, rating: newRating } : p
        ))
    }



    if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading providers...</h2>
    if (error) return <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}>{error}</h2>

    return (
        <div>
            <div style={{ textAlign: "center", padding: "30px 20px 10px" }}>
                <h1 style={{ color: "#1F4E79", fontSize: "32px" }}>Available Service Providers</h1>
                <p style={{ color: "#888", marginTop: "8px" }}>Choose from our verified professionals</p>
            </div>
            <div className="provider-grid">
                {providers.map((provider) => (
                    <div className="provider-card" key={provider._id}>
                        <h3>{provider.name}</h3>
                        <p>📂 Category: {provider.category}</p>
                        <p>⭐ Rating:{provider.rating} ({provider.totalRatings} ratings)</p>
                        <p>💰 Price: ₹{provider.price}/hour</p>
                        <p>📞 Phone: {provider.phone}</p>
                        <p style={{ color: provider.available ? "#1abc9c" : "red" }}>
                            {provider.available ? "✅ Available" : "❌ Not Available"}
                        </p>
                        <button onClick={() => navigate("/booking")}>Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services
