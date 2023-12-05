const Pharmacist = require('../models/Pharmacist');
const Patient = require('../models/Patient');
const Admin=require('../models/Admin');
const PharmacistRequests=require('../models/PharmacistRequests'); //TODO use this in regi
const patientControllers = require('../controllers/PatientControllers');
const pharmacistController = require('../controllers/PharmacistController');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '3projectalpha3@gmail.com',
        pass: 'ncgo dehg lebs zazh'
    }
});
const sendPasswordResetEmail = async (to, newPassword) => {
    const mailOptions = {
        from: '3projectalpha3@gmail.com',
        to,
        subject: 'Password Reset',
        text: `Your password has been reset. Your new password is: ${newPassword}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


const registerPatient = async (req, res) => {
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

    try {

      const emailPattern =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
          return res.status(400).json({ error: 'Invalid email format.' });
      }

      // Check if email is already in use
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ error: 'Email is already in use.' });
      }
      // Check if username is already in use in Patient schema
      const existingEmailInPatient = await Patient.findOne({ email });
      if (existingEmailInPatient) {
          return res.status(400).json({ error: 'Email is already in use in patient schema.' });
      }

      // Check if username is already in use User db
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
          return res.status(400).json({ error: 'Username is already in use in User schema.' });
      }
      // Check if username is already in use in Patient schema
      const existingUsernameInPatient = await Patient.findOne({ username });
      if (existingUsernameInPatient) {
          return res.status(400).json({ error: 'Username is already in use in patient schema.' });
      }
      // Check if password is valid
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordPattern.test(password)) {
          return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' });
      }

        

        const patient = await Patient.create(
          { name,
            username,
            email,
            mobileNumber,
            password,
            dateOfBirth,
            gender,
            emergencyContact}
        );
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'patient';
        const user = await User.create({ username,email, password: hashedPassword, role });
      //  const token = createToken(user.username);

       // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log("tewst before callig");
        

        res.status(200).json({ user, patient });
    } catch (error) {
        res.status(400).json({ error: error.message + "here" });
    }
};

const registerPharmacist = async (req, res) => {
    const { status = false,
        name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground
    } = req.body

     // Access file buffers from req.files
     const ID = req.files.ID[0].filename;
    const workingLicense = req.files.workingLicense[0].filename;
    const pharmacyDegree = req.files.pharmacyDegree[0].filename; 

    try {

      const emailPattern =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
       // Check if email is already in use
       const existingEmail = await User.findOne({ email });
       if (existingEmail) {
           return res.status(400).json({ error: 'Email is already in use.' });
       }
       // Check if username is already in use in Pharmacist Req schema schema
       const existingEmailInPharmacistRequests = await PharmacistRequests.findOne({ email });
       if (existingEmailInPharmacistRequests) {
           return res.status(400).json({ error: 'Email is already in use in PharmacistRequests schema.' });
       }
       // Check if username is already in use in Pharmacist schema
       const existingEmailInPharmacist = await Pharmacist.findOne({ email });
       if (existingEmailInPharmacist) {
           return res.status(400).json({ error: 'Email is already in use in Pharmacist schema.' });
       }
 
       // Check if username is already in use User db
       const existingUsername = await User.findOne({ username });
       if (existingUsername) {
           return res.status(400).json({ error: 'Username is already in use in User schema.' });
       }
       // Check if username is already in use in PharmacistRequests schema
       const existingUsernameInPharmacistRequests = await PharmacistRequests.findOne({ username });
       if (existingUsernameInPharmacistRequests) {
           return res.status(400).json({ error: 'Username is already in use in patient schema.' });
       }
        // Check if username is already in use in PharmacistRequests schema
        const existingUsernameInPharmacist = await Pharmacist.findOne({ username });
        if (existingUsernameInPharmacist) {
            return res.status(400).json({ error: 'Username is already in use in patient schema.' });
        }
       // Check if password is valid
       const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
       if (!passwordPattern.test(password)) {
           return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);

        
       
        const pharmReq = await PharmacistRequests.create({
            name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, status,ID,workingLicense,pharmacyDegree

        });
   
        const role = 'pharmacist';
        const registrationStatus = 'pending';
        const user = await User.create({ username, email, password: hashedPassword, role, registrationStatus });
      //  const token = createToken(user.username);

       // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });


        res.status(200).json({ user, pharmacistRequest:pharmReq });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




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

//FIXME should i check user role from the user db or overkill?>
//FIXME should the otp really be just one time?
const resetPasswordOTP = async (req, res) => {

    try {
        const { username, password,email } = req.body;

        const user= await User.findOne({ username }).exec();
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials: User does not exist in user schema' });
        }
        // Check Pharmacist database
        const pharmacist = await Pharmacist.findOne({ username });
        if (pharmacist) {
            pharmacist.password = password;
             user.password =  await bcrypt.hash(password, 10);
             await pharmacist.save();
             await user.save();

             await sendPasswordResetEmail(email, password);
            return res.json({ success: true, userType: 'pharmacist', user: pharmacist });

           // return res.json({ otp});
        }

        // Check Patient database
        const patient = await Patient.findOne({ username });
        if (patient) {
            patient.password = password;
            user.password =  await bcrypt.hash(password, 10);
            await patient.save();
            await user.save();

            await sendPasswordResetEmail(email, password);
           return res.json({ success: true, userType: 'patient', user: patient });
          // return res.json({ otp});
        }

        // Check Admin database
        const admin = await Admin.findOne({ username }).exec();
        if (admin) {
            admin.password = password;
            const check= admin.password
            hashedPassword = await bcrypt.hash(password, 10);
            user.password =  hashedPassword
            await sendPasswordResetEmail(email, password);
           await admin.save();
           await user.save();

            return res.json({ success: true, userType: 'admin', user: admin });
           // console.log(password + " " + user.password + " " + otp);

           // return res.json({ password} + {check} + {otp});
        }

        // If no user is found
        return res.status(401).json({ success: false, message: 'Invalid credentials; does not exist in Patient/Admin/Pharmacist' });
    } catch (error) {
        // Handle any errors
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }


};
module.exports = {
    registerPatient,
    registerPharmacist,
    login,
    resetPasswordOTP
};
