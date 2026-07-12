const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const Serviceman = require("../models/Serviceman")
const jwt = require("jsonwebtoken")

// Serviceman registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, category, experience, area, price } = req.body

        const exisiting = await Serviceman.findOne({ email })
        if (exisiting) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newServiceman = await Serviceman.create({
            name, email,
            password: hashedPassword,
            phone, category, experience, area, price
        })

        res.status(201).json({ message: "Registration submitted for apporval" })
    } catch (err) {
        console.log("Serviceman register error:", err.message)
        res.status(500).json({ message: "Server error", error: err.message })
    }
})


// Serviceman login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const serviceman = await Serviceman.findOne({ email })
        console.log("Found serviceman", serviceman)
        if (!serviceman) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, serviceman.password)
        if (!isMatch) {
            console.log("Something went worng")
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { servicemanId: serviceman._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({
            message: "Login successful",
            token,
            serviceman: {
                name: serviceman.name,
                email: serviceman.email,
                status: serviceman.status,
                category: serviceman.category
            }
        })

    } catch (err) {
        console.log("Serviceman login error:", err.message)
        res.status(500).json({ message: "Server error" })
    }
})


// Get all serviceman 
router.put("/:id/approve", async (req, res) => {
    try {
        const serviceman = await Serviceman.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        )
        res.json({ message: "Serviceman approved", serviceman })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Reject Serviceman 
router.put("/:id/reject", async (req, res) => {
    try {
        const serviceman = await Serviceman.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        )
        res.json({ message: "Serviceman rejected", serviceman })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Get all servicemen
router.get("/", async (req, res) => {
    try {
        const servicemen = await Serviceman.find().sort({ createdAt: -1 })
        res.json(servicemen)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router