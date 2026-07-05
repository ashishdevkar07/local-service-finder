const mongoose = require("mongoose")
require("dotenv").config()

const Provider = require("./models/Providers")

const providers = [
    { name: "Ramesh Plumbing Works", category: "Plumber", rating: 4.5, price: 300, phone: "9876543210", available: true },
    { name: "PowerFix Electricians", category: "Electrician", rating: 4.8, price: 400, phone: "9876543211", available: true },
    { name: "Sparkle Home Cleaning", category: "Cleaning", rating: 4.6, price: 250, phone: "9876543212", available: true },
    { name: "WoodCraft Carpentry", category: "Carpenter", rating: 4.3, price: 500, phone: "9876543213", available: true },
    { name: "ColorPro Painters", category: "Painting", rating: 4.7, price: 600, phone: "9876543214", available: true },
    { name: "QuickFix Plumbing", category: "Plumber", rating: 4.2, price: 280, phone: "9876543215", available: true }
]

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected")
        await Provider.deleteMany()
        await Provider.insertMany(providers)
        console.log("Providers sedded successfully")
        process.exit()
    })
    .catch((err) => {
        console.log("Error:",err)
        process.exit(1)
    })