const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    activeIngredient: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    medicinalUse: {
        type: String,
        required: true
    },


}, { timestamp: true })

module.exports = mongoose.model('Medicine', medSchema)