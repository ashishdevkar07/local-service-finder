/* 
    => When user submits booking form — React sends data here. We save it to MongoDB and send success back.

*/

const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")

// Create booking
router.post("/", async (req, res) => {
    try {
        const { name, phone, address, serviceType, date, time } = req.body
        const booking = await Booking.create({
            name, phone, address, serviceType, date, time
        })
        res.status(201).json({ message: "Booking created successfully", booking })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

// Get all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find()
        res.json(bookings)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router