const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');

// import { body, validationResult } from "express-validator";

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); //Appending extension
  },
});

const upload = multer({ storage: storage });

const {
  login,
  registerPatient,
  registerPharmacist,
  resetPasswordOTP,
  getUserById,
  getUserByUsername
} = require('../controllers/UserController')

// Login
router.post('/login', login);

// Register patient
router.post('/registerPatient', registerPatient);

// Make a pharmacist Request 
router.post("/registerPharmacist", upload.fields([{ name: 'ID', maxCount: 1 }, { name: 'workingLicense', maxCount: 1 }, { name: 'pharmacyDegree', maxCount: 1 }]), registerPharmacist);

// Reset password (OTP)
router.post('/resetPasswordOTP', resetPasswordOTP);

// Get user by id
router.get('/getUserById/:id', getUserById);

// Get user by username
router.get('/getUserByUsername/:username', getUserByUsername);

module.exports = router