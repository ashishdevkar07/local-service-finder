import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate()

    return (
        <div className="landing">
            <div className="landing-content">
                <h1>Welcome to <span>Local Service Finder</span></h1>
                <p>Your one-stop platform to find and book trusted local professionals - plumbers, electricians, cleaners and more.</p>
                <div className="landing-buttons">
                    <button className="btn-primary" onClick={() => navigate("/register")}>Get Started</button>
                    <button className="btn-secondary" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Landing