const express = require('express')
const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')

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

// FIXME: get all medicines (needs working on not complete )---> fadel search wa filter 
router.get("/getMed", getMed)

// view pharmacist info 
router.get('/getPharmacists', getPharmacist)

// view patient info 
router.get('/getPatients', getPatients)

module.exports = router