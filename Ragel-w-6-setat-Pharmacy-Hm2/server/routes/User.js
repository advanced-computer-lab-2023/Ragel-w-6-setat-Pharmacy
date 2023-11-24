const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');



//import { body, validationResult } from "express-validator";

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
    resetPasswordOTP
} = require('../controllers/UserController')

router.post('/login', login);

router.post('/registerPatient', registerPatient);
// Make a pharmacist Request 
router.post("/registerPharmacist", upload.fields([{ name:'ID', maxCount:1},{ name:'workingLicense', maxCount:1} , { name:'pharmacyDegree', maxCount:1}]), registerPharmacist);

router.post('/resetPasswordOTP', resetPasswordOTP);


module.exports = router