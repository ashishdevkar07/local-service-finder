/*
    => This file handles two things — creating new users and logging in existing users.
    => Register route:
           => req.body — data sent from frontend. When React sends register form data — it comes here.
            => Check if email already registered. If yes — send error back. Don't create duplicate.
           =>  Never save plain password in database. bcrypt.hash converts "mypassword123" to something like "2a$10
            xK8...". Nobody can read it back. The 10 is how many times it scrambles — more times = more secure but slower.
            => Save user to MongoDB. Send success response back to frontend.

    => Login route:
            => Find user by email. Then compare — user typed password vs stored hashed password. bcrypt knows how to compare them.
            => Create a JWT token — like a digital ID card that says "this user is logged in." Send it back to frontend. 
                Frontend stores this token and sends it with future requests to prove identity.

    => Simple — get all providers from database and send back as JSON. 
        Frontend will call this to get real provider data instead of dummy data.

*/

const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Hash password
        const hasedPassword = await bcrypt.hash(password, 10)

        // Create User
        const user = await User.create({
            name,
            email,
            password: hasedPassword,
            phone
        })

        res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

// Login 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({
            message: "Login Successful",
            token,
            user: { name: user.name, email: user.email }
        })
    } catch (err) {
        console.log("Login error:", err.message)
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

module.exports = router