const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    educationalBackground: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

}, { timestamp: true })

module.exports = mongoose.model('Requests', requestSchema)