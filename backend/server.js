/*
    => This is the starting point of your entire backend. When you run node server.js — this file runs first.
    => Importing all packages we need. dotenv loads your .env file so process.env.MONGO_URI works.
    => cors() — allows React frontend (port 3000/5173) to talk to backend (port 5000). Without this browser blocks the connection.
    => express.json() — allows backend to read JSON data sent from frontend. Without this req.body would be empty.
    => Connecting route files. Any request to /api/auth/... goes to auth.js. Any request to /api/providers/... goes to providers.js. 
        Think of these as departments — each handles its own requests.
    => Connect to MongoDB first. Only after connection is successful — start the server. 
        This order is important. You don't want server running without database.

*/


const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require("./routes/auth")
const providerRoutes = require("./routes/providers")
const bookingRoutes = require("./routes/bookings")

app.use("/api/auth", authRoutes)
app.use("/api/providers", providerRoutes)
app.use("/api/bookings", bookingRoutes)


// Test route
app.get("/", (req, res) => {
    res.json({ message: "Local Service Finder API is running!" })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB Connection error:", err)
    })