const express = require('express')
const Patient = require('../models/Patient')
const {
    createPatient,
    getMed
} = require('../controllers/PatientControllers')

const router = express.Router();

// TODO: register a new patient 
router.post('/', createPatient)

// TO UPDATE: get all medicines (needs working on not complete )---> fadel search wa filter 
router.get("/", getMed)

module.exports = router