const Pharmacist = require('../models/Pharmacist');
const Patient = require('../models/Patient');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check Pharmacist database
        const pharmacist = await Pharmacist.findOne({ username, password }).exec();
        if (pharmacist) {
            return res.json({ success: true, userType: 'pharmacist', user: pharmacist });
        }

        // Check Patient database
        const patient = await Patient.findOne({ username, password }).exec();
        if (patient) {
            return res.json({ success: true, userType: 'patient', user: patient });
        }

        // Check Admin database
        const admin = await Admin.findOne({ username, password }).exec();
        if (admin) {
            return res.json({ success: true, userType: 'admin', user: admin });
        }

        // If no user is found
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        // Handle any errors
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    login
};
