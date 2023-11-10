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
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);