const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const emergencyContactSchema = new Schema({
    _id: false, // Prevents emergencyContact from having its own _id field
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    relationTo: {
        type: String,
        required: true
    }
});

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        maxlength: 10
    },
    emergencyContact: {
        type: emergencyContactSchema,
        required: true
    },
    cart: {  items: [
        {
            medicineId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
                default: 0,
            },
            name: {
                type: String,
            },
        },
    ],
    totalQty: {
        type: Number,
        default: 0,
       // required: true,
    },
    totalCost: {
        type: Number,
        default: 0,
        //required: true,
    },
    // Reference to the Patient model
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        //required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    }
   
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);