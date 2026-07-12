import { Link, useNavigate } from 'react-router-dom'

function Navbar({ isLoggedIn, username, setIsLoggedIn }) {
    const navigate = useNavigate()
    const isAdmin = localStorage.getItem("isAdmin")

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userEmail")
        navigate("/")
        setIsLoggedIn(false)
    }

    function handleAdminLogout() {
        localStorage.removeItem("isAdmin")
        navigate("/")
    }

    return (
        <nav>
            <h2 onClick={() => navigate(isLoggedIn || isAdmin ? "/home" : "/")} style={{ cursor: "pointer" }}>
                🔧 Local Service Finder
            </h2>
            <div className="nav-links">
                {isAdmin ? (
                    <>
                        <Link to="/admin">Dashboard</Link>
                        <button className="logout-btn" onClick={handleAdminLogout}>Logout Admin</button>
                    </>
                ) : isLoggedIn ? (
                    <>
                        <Link to="/home">Home</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/booking">Booking</Link>
                        <Link to="/my-bookings">My Bookings</Link>
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