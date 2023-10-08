const express = require('express')
const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const {
    deletePatient,
    getMed,
    getPharmacist,
    getPatients
} = require('../controllers/AdminController')

const router = express.Router();

// TODO: add another admin 

// TODO: remove pharmacist

// delete a single patient 
router.delete('/:id', deletePatient)

// TODO: view all info uploaded by pharnacist 

// TO UPDATE: get all medicines (needs working on not complete )---> fadel search wa filter 
router.get("/", getMed)

// view pharmacist info 
router.get('/', getPharmacist)

// view patient info 
router.get('/', getPatients)

module.exports = router