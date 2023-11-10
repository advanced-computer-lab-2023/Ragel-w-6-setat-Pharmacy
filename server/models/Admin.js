const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({

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


}, { timestamp: true })

module.exports = mongoose.model('Admin', adminSchema)