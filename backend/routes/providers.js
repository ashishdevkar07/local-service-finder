const express = require("express")
const router = express.Router()
const Provider = require("../models/Providers")

// Get all providers
router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find()
        res.json(providers)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router