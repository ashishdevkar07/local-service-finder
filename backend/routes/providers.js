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

// Rate a provider 
router.post("/:id/rate", async (req, res) => {
    try {
        const { rating } = req.body
        const provider = await Provider.findById(req.params.id)

        if (!provider) {
            return res.status(404).json({ message: "Providers not found" })
        }

        // Calcu;ate new average rating
        const newTotalRatings = provider.totalRatings + 1
        const newRating = ((provider.rating * provider.totalRatings) + rating) / newTotalRatings

        provider.rating = Math.round(newRating * 10) / 10
        provider.totalRatings = newTotalRatings

        await provider.save()

        res.json({ message: "Rating submitted", rating: provider.rating })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})


module.exports = router