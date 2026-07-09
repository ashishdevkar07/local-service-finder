import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate()

    return (
        <div className="landing">
            <div className="landing-content">
                <h1>Your Home Deserves <span>The Best</span></h1>
               <p>Connect with trusted local professionals for plumbing, electrical, cleaning and more — right at your doorstep.</p>
                <div className="landing-buttons">
                    <button className="btn-primary" onClick={() => navigate("/register")}>Get Started free</button>
                    <button className="btn-secondary" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Landing