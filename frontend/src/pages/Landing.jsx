import { useNavigate } from "react-router-dom"

function Landing() {
    const navigate = useNavigate()

    return (
        <div className="landing">
            <div className="landing-content">
                <h1>Your Home Deserves <span>The Best</span></h1>
                <p>Connect with trusted local professionals for plumbing, electrical, cleaning and more — right at your doorstep.</p>
                <div className="landing-buttons">
                    <button className="btn-primary" onClick={() => navigate("/register")}>
                        I Need a Service
                    </button>
                    <button className="btn-secondary" onClick={() => navigate("/serviceman-register")}>
                        I Provide Services
                    </button>
                    <button className="btn-secondary" onClick={() => navigate("/login")}>
                        Customer Login
                    </button>
                    <button className="btn-secondary" onClick={() => navigate("/serviceman-login")}>
                        Provider Login
                    </button>
                </div>
                <p
                    onClick={() => navigate("/admin-login")}
                    style={{
                        marginTop: "30px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        textDecoration: "underline"
                    }}
                >
                    Admin Access
                </p>
            </div>
        </div>
    )
}

export default Landing