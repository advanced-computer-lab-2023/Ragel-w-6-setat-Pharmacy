const express = require('express')
const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')

const {
    // TODO: Add administrator
    // TODO: Delete a pharmacist
    deletePatient,
    // TODO: View all information uploaded by pharmacist to apply to join the platform
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getPharmacistsInfo,
    getPatientsInfo

} = require('../controllers/AdminController')

const router = express.Router();

// TODO: Add another administrator

// TODO: Delete a pharmacist

// Delete a patient 
router.delete('/:id', deletePatient)

// TODO: View all information uploaded by pharmacist to apply to join the platform

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

// View Pharmacist Information 
router.get('/getPharmacistsInfo', getPharmacistsInfo)

// View Patient Information 
router.get('/getPatientsInfo', getPatientsInfo)

module.exports = router

