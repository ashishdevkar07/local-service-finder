/*
    => Template for booking documents.
    status: "pending" — every new booking starts as pending. Later can be changed to "confirmed" or "completed".

*/



const { default: mongoose } = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "pending" },
    userEmail: { type: String, required: false },
    israted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema)