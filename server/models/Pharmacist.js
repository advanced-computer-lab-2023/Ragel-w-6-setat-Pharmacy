const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pharmSchema = new Schema({
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
        required: true,
        validate: {
          validator: function (password) {
            // Define your custom validation logic here
            // For example, require at least 8 characters, one uppercase letter, and one digit
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            return passwordPattern.test(password);
          },
          message: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.',
        },
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Define your custom email validation logic here
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailPattern.test(email);
            },
            message: 'Invalid email format.',
        },
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
    nationalId: {
        type: String,
    },
    pharmacyDegree: {
        type: String,
    },
    workingLicense: {
        type: String,
    },

}, { timestamp: true })

module.exports = mongoose.model('Pharmacist', pharmSchema)