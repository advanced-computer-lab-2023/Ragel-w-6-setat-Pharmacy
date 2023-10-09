const express = require('express')

const router = express.Router();
const {
    createPharmacist,
    addMed,
    getMed
} = require('../controllers/PharmacistController')

// add a pharmacist
router.post("/", createPharmacist)

// get all medicines (needs working on not complete )---> fadel search wa filter wa userstory 13 
router.get("/getMed", getMed)

// add a medicine 
router.post("/addMed", addMed)

// TODO: edit medicine details and price 

module.exports = router