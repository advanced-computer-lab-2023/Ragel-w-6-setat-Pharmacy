const express = require('express')
const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')


const router = express.Router();
const {
    createPharmacistRequest,
    getAllMedicines,
    getQuantityAndSalesOfMedicine,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    addMedicine
    // TODO: edit medicine details and price
} = require('../controllers/PharmacistController')

// Make a pharmacist Request 
router.post("/", createPharmacistRequest)

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// View the available quantity and sales of each medicine
router.get("/getQuantityAndSalesOfMedicine", getQuantityAndSalesOfMedicine)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

// Add a medicine 
router.post("/addMedicine", addMedicine)


// TODO: edit medicine details and price 

module.exports = router