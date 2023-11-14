// #Task route solution
const User = require('../models/User');
const Pharmacist = require('../models/Pharmacist');
const Patient = require('../models/Patient');
const Admin=require('../models/Admin');
const PharmacistRequests=require('../models/PharmacistRequests'); //TODO use this in regi
const patientController = require('../controllers/PatientController');
const pharmacistController = require('../controllers/PharmacistController');

const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
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

      // Check if username is already in use
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
          return res.status(400).json({ error: 'Username is already in use.' });
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
        const user = await User.create({ username,name, email, password: hashedPassword, role });
        const token = createToken(user.username);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log("tewst before callig");
        

        res.status(200).json({ user, patient });
    } catch (error) {
        res.status(400).json({ error: error.message + "here" });
    }
};

//FIXME should not have a session started unless they log in
const registerPharmacist = async (req, res) => {
    const {
        name,
        username,
        email,
        mobileNumber,
        password,
        dateOfBirth,
        gender,
        qualification,
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

      // Check if username is already in use
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
          return res.status(400).json({ error: 'Username is already in use.' });
      }
       // Check if password is valid
       const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
       if (!passwordPattern.test(password)) {
           return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);

        
        const pharmacistRequest = await pharmacistController.createPharmacistRequest(
            name,
            username,
            email,
            mobileNumber,
            hashedPassword,
            dateOfBirth,
            gender,
            qualification,
            'false'
        );
        const role = 'pharmacist';
        const registrationStatus = 'pending';
        const user = await User.create({ name, email, password: hashedPassword, role, registrationStatus });
        const token = createToken(user.username);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });


        res.status(200).json({ user, pharmacistRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const login = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        const user = await User.findOne({ username });
    
        if (!user) {
          return res.status(400).json({ message: 'User not found in User Schema' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid password' });
        }
      //  const usernameInSchema=user.username;
        if (user.role==='admin'){
            const userInSchema = await User.findOne({ username });
            if (!userInSchema) {
              return res.status(400).json({ message: 'User not found in Admin Schema' });
            } }
        if (user.role==='patient'){
            
            const userInSchema = await Patient.findOne({ username });
            if (!userInSchema) {
              return res.status(400).json({ message: 'User not found in Patient Schema' });
            } }
        if (user.role==='pharmacist'){
            if(user.registrationStatus==='pending'){
                return res.status(400).json({ message: 'Registration as pharmacist is pending' });
            }
            const userInSchema = await Pharmacist.findOne({ username });
            if (!userInSchema) {
              return res.status(400).json({ message: 'User not found in Pharmacist Schema' });
            } }
    
            const token = createToken(username);   
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });    
            res.status(200).json({ token, user});
            
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
      }
};


const logout = async (req, res) => {
    // TODO Logout the user
    res.clearCookie('jwt');
    res.status(200).json({ message: 'User logged out' });

}

const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };








module.exports = { registerPatient,registerPharmacist, logout, login , getUsers};