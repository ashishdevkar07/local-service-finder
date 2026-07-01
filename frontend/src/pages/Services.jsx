import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Services() {
    const [providers, setProviders] = useState([
        { id: 1, name: "Ramesh Plumbing Workers", category: "Plumber", rating: 4.5, price: 300 },
        { id: 2, name: "PowerFix Electricians", category: "Electrician", rating: 4.8, price: 400 },
        { id: 3, name: "Sparkle Home Cleaning", category: "Cleaning", rating: 4.6, price: 250 },
        { id: 4, name: "WoodCraft Carpentary", category: "Carpenter", rating: 4.7, price: 500 },
        { id: 5, name: "ColorPro Painters", category: "Painting", rating: 4.7, price: 600 },
        { id: 6, name: "QuickFix Plumbing", category: "Plumber", rating: 4.2, price: 280 }
    ])

    const navigate = useNavigate()

    return (
        <div>
            <h1>Available Services Providers</h1>
            <div className="provider-grid">
                {providers.map((provider) => (
                    <div className="provider-card" key={provider.id}>
                        <h3>{provider.name}</h3>
                        <p>Category : {provider.category}</p>
                        <p>Rating : {provider.rating}</p>
                        <p>Price : ₹{provider.price}/hour</p>
                        <button onClick={() => navigate("/booking")}>Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services
