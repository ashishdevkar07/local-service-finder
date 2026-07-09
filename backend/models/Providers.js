/*
    => Same concept as User model but for service providers.
    default: 4.0 — if rating is not provided, it automatically becomes 4.0
    default: true — provider is available by default when created
    type: Number — stores numbers, not text
    type: Boolean — stores true or false only

*/


const mongoose = require("mongoose")

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 4.0 },
    totalRatings: { type: Number, default: 0 },
    price: { type: Number, required: true },
    phone: { type: String, required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model("Provider", providerSchema)