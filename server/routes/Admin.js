const express = require('express')


const {
    // TODO: Add administrator
    // TODO: Delete a pharmacist
    deletePatient,
    // TODO: View all information uploaded by pharmacist to apply to join the platform
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getPharmacistsInfos,
    getPatientsInfo,
    getSinglePatientInfo,
    getSinglePharmacistInfo
,addAdmin, getAdmins,deletePharmacist
} = require('../controllers/AdminController')

const router = express.Router();

//  add another admin 
router.get("/addAdmin", addAdmin)

// view all admins
router.get("/getAdmins", getAdmins)

// delete pharmacist
 
router.delete('/pharmacist/:id', deletePharmacist)

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

//View a single Pharmacist's Info
router.get('/getSinglePharmacistInfo/:id',getSinglePharmacistInfo)

// View Patient Information 
router.get('/getPatientsInfo', getPatientsInfo)

//View a single Patient's Info
router.get('/getSinglePatientInfo/:id',getSinglePatientInfo)

module.exports = router

