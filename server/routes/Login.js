// server/routes/login.js
require("dotenv").config();

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// POST /api/login
router.post('/', async (req, res) => {
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
    const usernameInSchema=user.username;
    if (user.role==='admin'){
        const userInSchema = await User.findOne({ usernameInSchema });
        if (!userInSchema) {
          return res.status(400).json({ message: 'User not found in Admin Schema' });
        } }
    if (user.role==='patient'){
        
        const userInSchema = await Patient.findOne({ usernameInSchema });
        if (!userInSchema) {
          return res.status(400).json({ message: 'User not found in Patient Schema' });
        } }
    if (user.role==='pharmacist'){
        if(user.registrationStatus==='pending'){
            return res.status(400).json({ message: 'Registration as pharmacist is pending' });
        }
        const userInSchema = await Pharmacist.findOne({ usernameInSchema });
        if (!userInSchema) {
          return res.status(400).json({ message: 'User not found in Pharmacist Schema' });
        } }


        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
          if (!token) return res.status(401).json({ message: 'Unauthorized' });
        
          try {
              const decoded = jwt.verify(token, jwtSecret, (err,user) => {
                if (err) {
                  return res.status(403).json({ message: 'we know you have token but that token in no longer valid babe' });
                }
                req.user = user;
                next();
              });
            req.user = decoded;
            next();
          } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
          }
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
