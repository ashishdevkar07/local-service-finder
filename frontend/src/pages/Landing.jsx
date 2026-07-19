import { useNavigate } from "react-router-dom"

function Landing() {
    const navigate = useNavigate()

    return (
        <div style={{
            minHeight: "100vh",
            background: "#1C0A00",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background image overlay */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.15
            }} />

            {/* Top navbar */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 60px",
                position: "relative",
                zIndex: 10
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "42px",
                        height: "42px",
                        background: "linear-gradient(135deg, #C9A84C, #6D1A36)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px"
                    }}>🏠</div>
                    <span style={{
                        color: "#FDF6EC",
                        fontSize: "18px",
                        fontWeight: "700",
                        fontFamily: "Poppins, sans-serif",
                        letterSpacing: "0.5px"
                    }}>LocalServe</span>
                </div>

                {/* Nav links */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "10px 24px",
                            background: "transparent",
                            color: "#F5ECD7",
                            border: "1px solid rgba(245,236,215,0.4)",
                            borderRadius: "25px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif",
                            transition: "all 0.3s"
                        }}
                        onMouseEnter={e => e.target.style.borderColor = "#C9A84C"}
                        onMouseLeave={e => e.target.style.borderColor = "rgba(245,236,215,0.4)"}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/admin-login")}
                        style={{
                            padding: "10px 24px",
                            background: "transparent",
                            color: "rgba(245,236,215,0.4)",
                            border: "none",
                            fontSize: "13px",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif"
                        }}
                    >
                        Admin
                    </button>
                </div>
            </div>

            {/* Hero content */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "60px 20px",
                position: "relative",
                zIndex: 10
            }}>
                {/* Badge */}
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.4)",
                    borderRadius: "25px",
                    padding: "8px 20px",
                    marginBottom: "32px"
                }}>
                    <span style={{ fontSize: "12px" }}>✨</span>
                    <span style={{
                        color: "#C9A84C",
                        fontSize: "13px",
                        fontWeight: "500",
                        fontFamily: "Poppins, sans-serif"
                    }}>
                        Trusted by 10,000+ homeowners
                    </span>
                </div>

                {/* Main heading */}
                <h1 style={{
                    fontSize: "64px",
                    fontWeight: "700",
                    color: "#FDF6EC",
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: "1.15",
                    marginBottom: "24px",
                    maxWidth: "800px"
                }}>
                    Your home.{" "}
                    <span style={{ color: "#C9A84C" }}>Your neighborhood.</span>
                    {" "}Handled.
                </h1>

                {/* Subtext */}
                <p style={{
                    fontSize: "18px",
                    color: "rgba(245,236,215,0.75)",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.8",
                    marginBottom: "48px",
                    maxWidth: "560px"
                }}>
                    Connect with verified local professionals for plumbing,
                    electrical, cleaning and more — right at your doorstep.
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                    <button
                        onClick={() => navigate("/register")}
                        style={{
                            padding: "16px 40px",
                            background: "linear-gradient(135deg, #C9A84C, #a07830)",
                            color: "#1C0A00",
                            border: "none",
                            borderRadius: "30px",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif",
                            boxShadow: "0 8px 25px rgba(201,168,76,0.35)",
                            transition: "all 0.3s"
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = "translateY(-2px)"
                            e.target.style.boxShadow = "0 12px 30px rgba(201,168,76,0.5)"
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = "translateY(0)"
                            e.target.style.boxShadow = "0 8px 25px rgba(201,168,76,0.35)"
                        }}
                    >
                        Find a Service →
                    </button>

                    <button
                        onClick={() => navigate("/serviceman-register")}
                        style={{
                            padding: "16px 40px",
                            background: "transparent",
                            color: "#FDF6EC",
                            border: "2px solid rgba(253,246,236,0.4)",
                            borderRadius: "30px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            fontFamily: "Poppins, sans-serif",
                            transition: "all 0.3s"
                        }}
                        onMouseEnter={e => {
                            e.target.style.borderColor = "#C9A84C"
                            e.target.style.color = "#C9A84C"
                            e.target.style.transform = "translateY(-2px)"
                        }}
                        onMouseLeave={e => {
                            e.target.style.borderColor = "rgba(253,246,236,0.4)"
                            e.target.style.color = "#FDF6EC"
                            e.target.style.transform = "translateY(0)"
                        }}
                    >
                        Join as Provider
                    </button>
                </div>

                {/* Stats */}
                <div style={{
                    display: "flex",
                    gap: "60px",
                    marginTop: "80px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {[
                        { number: "500+", label: "Service Providers" },
                        { number: "10K+", label: "Happy Customers" },
                        { number: "50+", label: "Service Categories" },
                        { number: "4.9★", label: "Average Rating" }
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <p style={{
                                fontSize: "28px",
                                fontWeight: "700",
                                color: "#C9A84C",
                                fontFamily: "Poppins, sans-serif",
                                marginBottom: "4px"
                            }}>{stat.number}</p>
                            <p style={{
                                fontSize: "13px",
                                color: "rgba(245,236,215,0.6)",
                                fontFamily: "Inter, sans-serif"
                            }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom serviceman login */}
            <div style={{
                textAlign: "center",
                padding: "24px",
                position: "relative",
                zIndex: 10,
                borderTop: "1px solid rgba(255,255,255,0.08)"
            }}>
                <p style={{
                    color: "rgba(245,236,215,0.5)",
                    fontSize: "13px",
                    fontFamily: "Inter, sans-serif"
                }}>
                    Are you a service provider?{" "}
                    <span
                        onClick={() => navigate("/serviceman-login")}
                        style={{
                            color: "#C9A84C",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Landing