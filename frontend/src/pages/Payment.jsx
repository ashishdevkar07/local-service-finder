import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Payment() {
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [loading, setLoading] = useState(false)
    const [paid, setpaid] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    //Get Booking details passed from the booking page
    const service = localStorage.getItem("bookingService") || "Service"
    const amount = localStorage.getItem("bookingAmount") || "299"
    const bookingId = localStorage.getItem("lastBookingId")
    console.log("Booking ID for payment:", bookingId)

    function formatCardNumber(value) {
        //Add space after every 4 digits - like real card
        return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
    }

    function handleCardNumber(e) {
        const formatted = formatCardNumber(e.target.value.replace(/\D/g, ""))
        if (formatted.length <= 29) {
            setCardNumber(formatted)
        }
    }

    function handleExpiry(e) {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2)
        }
        if (value.length <= 5) {
            setExpiry(value)
        }
    }

    function handleCvv(e) {
        const value = e.target.value.replace(/\D/g, "")
        if (value.length <= 3) {
            setCvv(value)
        }
    }

    async function handlePayment() {
        if (!cardName || !cardNumber || !expiry || !cvv) {
            setError("Please fill all card details")
            return
        }

        if (cardNumber.replace(/\s/g, "").length < 16) {
            setError("Please enter a valid 16 digit card number")
            return
        }

        if (cvv.length < 3) {
            setError("Plase enter a valid CVV")
            return
        }

        try {
            setLoading(true)
            setError("")

            // simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Save payment to database
            const bookingId = localStorage.getItem("lastBookingId")
            if (bookingId) {
                await fetch(`http://localhost:5000/api/bookings/${bookingId}/payment`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" }
                })
            }

            setpaid(true)

        } catch (err) {
            setError("Payment failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Payment success screen
    if (paid) {
        return (
            <div style={{ maxWidth: "500px", margin: "40px auto", padding: "0 20px" }}>
                <div style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "40px",
                    boxShadow: "0 8px 30px rgba(111,78,55,0.12)",
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: "60px", marginBottom: "16px" }}>✅</div>
                    <h2 style={{ color: "#3E2723", marginBottom: "10px" }}>Payment Successful!</h2>
                    <p style={{ color: "#8B7355", marginBottom: "24px" }}>
                        Your payment of <strong>₹{amount}</strong> for <strong>{service}</strong> has been received.
                    </p>

                    {/* Receipt */}
                    <div style={{
                        background: "#F8F4EF",
                        borderRadius: "16px",
                        padding: "20px",
                        marginBottom: "24px",
                        textAlign: "left"
                    }}>
                        <h3 style={{ color: "#6F4E37", marginBottom: "12px", fontSize: "16px" }}>
                            Payment Receipt
                        </h3>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <p style={{ color: "#8B7355", fontSize: "14px" }}>Service</p>
                            <p style={{ color: "#3E2723", fontWeight: "600", fontSize: "14px" }}>{service}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <p style={{ color: "#8B7355", fontSize: "14px" }}>Amount Paid</p>
                            <p style={{ color: "#3E2723", fontWeight: "600", fontSize: "14px" }}>₹{amount}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <p style={{ color: "#8B7355", fontSize: "14px" }}>Payment Method</p>
                            <p style={{ color: "#3E2723", fontWeight: "600", fontSize: "14px" }}>
                                Card ending {cardNumber.slice(-4)}
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <p style={{ color: "#8B7355", fontSize: "14px" }}>Date</p>
                            <p style={{ color: "#3E2723", fontWeight: "600", fontSize: "14px" }}>
                                {new Date().toLocaleDateString()}
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ color: "#8B7355", fontSize: "14px" }}>Status</p>
                            <p style={{ color: "#2d8a4e", fontWeight: "700", fontSize: "14px" }}>✅ Paid</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/my-bookings")}
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: "linear-gradient(135deg, #6F4E37, #C89B6D)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            fontSize: "16px"
                        }}
                    >
                        View My Bookings
                    </button>
                </div>
            </div>
        )
    }


    // Payment form
    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{
                background: "white",
                borderRadius: "24px",
                padding: "40px",
                boxShadow: "0 8px 30px rgba(111,78,55,0.12)",
                overflow: "hidden"
            }}>
                <h1 style={{ color: "#3E2723", marginBottom: "6px" }}>Payment</h1>
                <p style={{ color: "#8B7355", marginBottom: "24px", fontSize: "14px" }}>
                    Paying ₹{amount} for {service}
                </p>

                {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "12px" }}>{error}</p>}

                {/* Card Preview */}
                <div style={{
                    background: "linear-gradient(135deg, #6F4E37, #C89B6D)",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "24px",
                    color: "white"
                }}>
                    <p style={{ fontSize: "12px", opacity: "0.8", marginBottom: "16px" }}>DEBIT / CREDIT CARD</p>
                    <p style={{ fontSize: "20px", letterSpacing: "3px", marginBottom: "16px", fontFamily: "monospace" }}>
                        {cardNumber || "•••• •••• •••• ••••"}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <p style={{ fontSize: "10px", opacity: "0.7" }}>CARD HOLDER</p>
                            <p style={{ fontSize: "14px" }}>{cardName || "YOUR NAME"}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "10px", opacity: "0.7" }}>EXPIRES</p>
                            <p style={{ fontSize: "14px" }}>{expiry || "MM/YY"}</p>
                        </div>
                    </div>
                </div>

                {/* Form fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={{
                            padding: "12px 16px",
                            border: "2px solid #EFE7DD",
                            borderRadius: "12px",
                            fontSize: "15px",
                            fontFamily: "Inter, sans-serif",
                            background: "#FFF8F0",
                            outline: "none"
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={handleCardNumber}
                        maxLength="19"
                        style={{
                            padding: "12px 16px",
                            border: "2px solid #EFE7DD",
                            borderRadius: "12px",
                            fontSize: "15px",
                            fontFamily: "monospace",
                            background: "#FFF8F0",
                            outline: "none",
                            letterSpacing: "2px"
                        }}
                    />
                    <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={handleExpiry}
                            maxLength="5"
                            style={{
                                padding: "12px 16px",
                                border: "2px solid #EFE7DD",
                                borderRadius: "12px",
                                fontSize: "15px",
                                fontFamily: "Inter, sans-serif",
                                background: "#FFF8F0",
                                outline: "none",
                                flex: 1,
                                minWidth: 0,
                            }}
                        />
                        <input
                            type="password"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleCvv}
                            maxLength="3"
                            style={{
                                padding: "12px 16px",
                                border: "2px solid #EFE7DD",
                                borderRadius: "12px",
                                fontSize: "15px",
                                fontFamily: "Inter, sans-serif",
                                background: "#FFF8F0",
                                outline: "none",
                                flex: 1,
                                minWidth: 0,
                            }}
                        />
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        style={{
                            padding: "14px",
                            background: loading ? "#ccc" : "linear-gradient(135deg, #6F4E37, #C89B6D)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontSize: "16px",
                            fontWeight: "600",
                            fontFamily: "Poppins, sans-serif",
                            transition: "all 0.3s"
                        }}
                    >
                        {loading ? "Processing Payment..." : `Pay ₹${amount}`}
                    </button>

                    <p style={{ textAlign: "center", fontSize: "12px", color: "#8B7355" }}>
                        🔒 Secured by SSL encryption
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Payment