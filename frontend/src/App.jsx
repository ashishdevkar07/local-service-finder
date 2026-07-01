import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

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
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App