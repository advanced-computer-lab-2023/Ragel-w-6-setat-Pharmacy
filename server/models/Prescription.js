const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    },
    medication: [
        {
            medicineId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
            },
            name: {
                type: String,
                required: true,
            },
            dosage: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    isFilled: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    exported: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);

