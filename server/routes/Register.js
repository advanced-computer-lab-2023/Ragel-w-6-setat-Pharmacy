// server/routes/register.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Pharmacist = require('../models/Pharmacist');
const patientController = require('../controllers/PatientController');
const pharmacistController = require('../controllers/PharmacistController');

// POST /api/register
router.post('/patient', async (req, res) => {
    router.post('/patient', async (req, res) => {
        const {
          name,
          username,
          email,
          mobileNumber,
          password,
          dateOfBirth,
          gender,
          emergencyContact,
        } = req.body;
        // Check if the email is already in use in User Schema
        const existingUserinUserSchema = await User.findOne({ email });
        if (existingUserinUserSchema) {
          return res.status(400).json({ message: 'Email already registered' });
        }
        // Check if the email is already in use in Patient Schema
        const existingUserInPatientSchema = await Patient.findOne({ email });
        if (existingUserInPatientSchema) {
          return res.status(400).json({ message: 'Email already registered' });
        }

        
        try {
                    // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);
            const role='patient';
            const user = new User({ username, email, password: hashedPassword,role });
            await user.save();

            const token = jwt.sign({ userId: user.id }, jwtSecret);

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Registration failed: while creating User in Register.js' });
        }
          // Call the createPatient function from the patient controller
         try{ 
            const hashedPassword = await bcrypt.hash(password, 10);

            const patient = await patientController.createPatient(
            name,
            username,
            email,
            mobileNumber,
            hashedPassword,
            dateOfBirth,
            gender,
            emergencyContact
          );
      
          res.status(200).json(patient);
        } catch (error) {
          res.status(400).json({ error: error.message + ' while creating Patient in Register.js' });
        }
      });
      
    

    
});

// POST /api/register
//creates a user but who's status is still pending
router.post('/pharmacist', async (req, res) => {
    const {
      name,
      username,
      email,
      mobileNumber,
      password,
      dateOfBirth,
      gender,
      qualification, // Add pharmacist-specific fields
    } = req.body;
    // Check if the email is already in use in User Schema
    const existingUserinUserSchema = await User.findOne({ email });
    if (existingUserinUserSchema) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Check if the email is already in use in Pharmacist Schema
    const existingUserInPharmacySchema = await Pharmacist.findOne({ email });
    if (existingUserInPharmacySchema) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const role='pharmacist';
        const registrationStatus='pending';
        const user = new User({ username, email, password: hashedPassword,role,registrationStatus });
        await user.save();

            const token = jwt.sign({ userId: user.id }, jwtSecret);

            res.json({ token });
            } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Registration failed: while creating User in Register.js' });
            }
            
            //FIXME because I should be passing the documents after they get uploaded here so have to change schema 
            //and change how to read this and handle it

            // Call the createPatient function from the admin controller
            try{
                const status="false"; 
                const pharmacistRequest = await pharmacistController.createPharmacistRequest(
                name,
                username,
                email,
                mobileNumber,
                hashedPassword,
                dateOfBirth,
                gender,
                qualification,
                status
            );

            res.status(200).json(pharmacistRequest);
            } catch (error) {
            res.status(400).json({ error: error.message + ' while creating Patient in Register.js' });
            }


            });

  


module.exports = router;
