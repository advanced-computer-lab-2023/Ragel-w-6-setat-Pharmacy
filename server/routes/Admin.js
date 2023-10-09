const express = require('express')


const {
    deletePatient,
    getMed,
    getPharmacists,
    getPatients,addAdmin, getAdmins,deletePharmacist
} = require('../controllers/AdminController')

const router = express.Router();

//  add another admin 
router.get("/addAdmin", addAdmin)

// view all admins
router.get("/getAdmins", getAdmins)

// delete pharmacist
 
router.delete('/pharmacist/:id', deletePharmacist)

// delete a single patient 
router.delete('/patient/:id', deletePatient)

// TODO: view all info uploaded by pharmacist 

// FIXME: get all medicines (needs working on not complete )---> fadel search wa filter 
router.get("/getMed", getMed)

// view pharmacist info 
router.get('/getPharmacists', getPharmacists)

// view patient info 
router.get('/getPatients', getPatients)

module.exports = router