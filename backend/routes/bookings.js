/* 
    => When user submits booking form — React sends data here. We save it to MongoDB and send success back.

*/

const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")

// Create booking
router.post("/", async (req, res) => {
    try {
        const { name, phone, address, serviceType, date, time, userEmail } = req.body
        const booking = await Booking.create({
            name, phone, address, serviceType, date, time, userEmail
        })
        res.status(201).json({ message: "Booking created successfully", booking })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

// Get bookings by user email - using query paramater
router.get("/user", async (req, res) => {
    try {
        const email = req.query.email
        const bookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 })
        res.json(bookings)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Update Booking status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        res.json({ message: "Status updated", booking })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Mark booking as read
router.put("/:id/rated", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { israted: true },
            { new: true }
        )
        res.json({ message: "Marked as read", booking })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})



// Get all bookings (admin)
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find()
        res.json(bookings)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router