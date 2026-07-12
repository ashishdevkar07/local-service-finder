import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingHistory from "./pages/BookingHistory";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ServicemanRegister from "./pages/ServicemanRegister";
import ServicemanLogin from "./pages/ServicemanLogin";
import ServicemanDashboard from "./pages/ServicemanDashboard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    // Restore login state on refresh
    useEffect(() => {
        const token = localStorage.getItem("token")
        const savedUsername = localStorage.getItem("username")
        if (token && savedUsername) {
            setIsLoggedIn(true)
            setUsername(savedUsername)
        }
    }, [])

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/my-bookings" element={<BookingHistory />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/serviceman-register" element={<ServicemanRegister />} />
                    <Route path="/serviceman-login" element={<ServicemanLogin />} />
                    <Route path="/serviceman-dashboard" element={<ServicemanDashboard />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App