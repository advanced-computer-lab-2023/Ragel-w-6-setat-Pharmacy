const express = require('express')

const {
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse
} = require('../controllers/PatientController')

const router = express.Router();

// Register as a patient

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

module.exports = router