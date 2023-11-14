const express = require('express')
const multer = require('multer');
const upload = multer(); // Configure multer without storage to handle in-memory files

const router = express.Router();
const {
    createPharmacistRequest,
    createPharmacist,
    getAllMedicines,
    getQuantityAndSalesOfMedicine,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    addMedicine,
    editMedicine
} = require('../controllers/PharmacistController')

// Make a pharmacist Request 
router.post("/createPharmacistRequest", createPharmacistRequest)

//Create a Pharmacist 
router.post("/", createPharmacist)


//Create a Pharmacist 
router.post("/", createPharmacist)


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
router.patch("/editMedicine/:medicineId", editMedicine)

module.exports = router