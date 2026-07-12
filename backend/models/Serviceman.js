const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")

const servicemanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unqiue: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    experience: { type: String, required: true },
    area: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, default: "pending" },
    available: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = moongose.model("Serviceman", servicemanSchema)