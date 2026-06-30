import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <h2>Local Service Finder</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/services">Services</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

            </div>
        </nav>
    )
}

export default Navbar