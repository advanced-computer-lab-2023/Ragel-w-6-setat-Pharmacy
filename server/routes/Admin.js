const express = require('express')

const {
    deletePatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getPharmacistsInfo,
    getPatientsInfo,
    getSinglePatientInfo,
    getSinglePharmacistInfo,
    addAdmin,
    getAdmins,
    deletePharmacist,
    getPharmacistsRequestsInfo,
    deleteAdmin,
    deleteAdminByUsername,
    deletePatientByUsername,
    deletePharmacistByUsername,
    changeAdminPassword,
    createPharmacist,
    rejectPharmacistRequest,
    getTotalSalesReport,
    
} = require('../controllers/AdminController')

const router = express.Router();

//  Add another admin 
router.post("/addAdmin", addAdmin)

// Create pharmacist
router.post("/createPharmacist", createPharmacist)

// Reject pharmacist request
router.delete("/rejectPharmacistRequest/:id", rejectPharmacistRequest)

// View all admins
router.get("/getAdmins", getAdmins)

// Delete an Admin
router.delete("/deleteAdmin/:id", deleteAdmin)

// Delete an Admin by username
router.delete("/deleteAdminByUsername/:username", deleteAdminByUsername)

// Delete pharmacist
router.delete('/deletePharmacist/:id', deletePharmacist)

// Delete pharmacist by name
router.delete('/deletePharmacistByUsername/:username', deletePharmacistByUsername)

// Delete a patient 
router.delete('/deletePatient/:id', deletePatient)

// Delete patient by name
router.delete('/deletePatientByUsername/:username', deletePatientByUsername)

// View all information uploaded by pharmacist to apply to join the platform
router.get("/getPharmacistsRequestsInfo", getPharmacistsRequestsInfo)

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

// View Pharmacist Information 
router.get('/getPharmacistsInfo', getPharmacistsInfo)

// View a single Pharmacist's Info
router.get('/getSinglePharmacistInfo/:id', getSinglePharmacistInfo)

// View Patient Information 
router.get('/getPatientsInfo', getPatientsInfo)

// View a single Patient's Info
router.get('/getSinglePatientInfo/:id', getSinglePatientInfo)

// Change admin password
router.post('/changeAdminPassword', changeAdminPassword);

// Get total sales report based on a chosen month
router.get('/getTotalSalesReport', getTotalSalesReport)

module.exports = router