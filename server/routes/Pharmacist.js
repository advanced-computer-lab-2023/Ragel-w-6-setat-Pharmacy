const express = require('express')
const multer = require('multer');
const path = require('path');

// import { body, validationResult } from "express-validator";

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); //Appending extension
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

const {
  createPharmacistRequest,
  createPharmacist,
  getAllMedicines,
  getQuantityAndSalesOfMedicine,
  getMedicineByName,
  getMedicinesByMedicinalUse,
  addMedicine,
  editMedicine,
  changePharmacistPassword,
  getTotalSalesReport,
  getFilteredSalesReport,
  archiveMedicine,
  unarchiveMedicine,
  getAllMedicinesOutOfStock,
  getWalletBalance
    
} = require('../controllers/PharmacistController')

// Make a pharmacist Request 
router.post("/createPharmacistRequest", upload.fields([{ name: 'ID', maxCount: 1 }, { name: 'workingLicense', maxCount: 1 }, { name: 'pharmacyDegree', maxCount: 1 }]), createPharmacistRequest);

// Create a Pharmacist 
router.post("/createPharmacist", upload.fields([{ name: 'ID', maxCount: 1 }, { name: 'workingLicense', maxCount: 1 }, { name: 'pharmacyDegree', maxCount: 1 }]), createPharmacist);

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// View the available quantity and sales of each medicine
router.get("/getQuantityAndSalesOfMedicine", getQuantityAndSalesOfMedicine)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

// Add a medicine 
router.post("/addMedicine", upload.single('image'), addMedicine);

// Edit medicine details and price 
router.patch("/editMedicine", editMedicine)

// Change pharmacist's password
router.post('/changePharmacistPassword', changePharmacistPassword);

// Get total sales report based on a chosen month
router.get('/getTotalSalesReport', getTotalSalesReport)

// Filter sales report based on medicine and date sold
router.get('/getFilteredSalesReport', getFilteredSalesReport)

// Archive medicine
router.put('/archiveMedicine/:id', archiveMedicine);

// Unarchive medicine
router.put('/unarchiveMedicine/:id', unarchiveMedicine);

//Get all out of stock medicines
router.get('/getAllMedicinesOutOfStock', getAllMedicinesOutOfStock);

router.get('/getWalletBalance/:pharmacistId',getWalletBalance);

module.exports = router