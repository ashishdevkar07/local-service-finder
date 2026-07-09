import { useState } from "react";

function StarRating({ providerId, currentRating, onRated }) {
    const [hoverd, setHoverd] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    async function handleRating(rating) {
        try {
            const response = await fetch(`http://localhost:5000/api/providers/${providerId}/rate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating })
            })
            const data = await response.json()
            if (response.ok) {
                setSubmitted(true)
                onRated(data.rating)
            }
        } catch (err) {
            console.log("Rating error", err)
        }
    }

    if (submitted) {
        return <p style={{ color: "#C89B6D", fontSize: "13px" }}>✅ Thanks for rating!</p>
    }

    return (
        <div style={{ display: "flex" , gap: "4px", margin: "8px 0"}}>
            {[1,2,3,4,5].map((star) => (
                <span 
                    key={star}
                    style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: star <= (hoverd || currentRating) ? "#C89B6D" : "#ddd",
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={() => setHoverd(star)}
                    onMouseLeave={() => setHoverd(0)}
                    onClick={() => handleRate(star)}
                >
                     ★
                </span>
            ))}
        </div>
    )
}

export default StarRating