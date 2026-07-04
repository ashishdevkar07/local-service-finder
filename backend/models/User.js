/* 
    => Model defines what a User document looks like in MongoDB. Like a template.
    => Each field has a type and rules:
                            type: String — this field stores text
                            required: true — this field cannot be empty
                            unique: true — no two users can have same email
                            timestamps: true — MongoDB automatically adds createdAt and updatedAt dates
    => timestamps: true — MongoDB automatically adds createdAt and updatedAt dates
*/


const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)