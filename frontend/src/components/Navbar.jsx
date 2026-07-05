import { Link, useNavigate } from 'react-router-dom'

function Navbar({ isLoggedIn, username, setIsLoggedIn }) {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setIsLoggedIn(false)
        navigate("/")
    }

    return (
        <nav>
            <h2 onClick={() => navigate(isLoggedIn ? "/home" : "/")} style={{ cursor: "pointer" }}>
                🔧 Local Service Finder</h2>

            <div className="nav-Links">
                {isLoggedIn ? (
                    <>
                        <Link to="/home">Home</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/booking">Booking</Link>
                        <span className="nav-username">👤 {username}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar