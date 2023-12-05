const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,

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
    totalSales: {
        type: Number,
        //required: true
    },
    overTheCounter:{
        type: Boolean,
         //required: true
    },
    archived: {
        type: Boolean,
        default: false
    },
    outOfStock: {
        type: Boolean,
        required: true
    }
}, { timestamp: true })


module.exports = mongoose.model('Medicine', medSchema)