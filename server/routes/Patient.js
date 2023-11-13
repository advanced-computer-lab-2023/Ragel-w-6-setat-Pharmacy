const express = require('express')

const {
    createPatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    addToCart,
    viewCart,
    removeFromCart,
    changeQuantityInCart
} = require('../controllers/PatientControllers')

const router = express.Router();

// Register as a patient
router.post('/', createPatient)

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

// Add to cart 
router.get("/addToCart/:patientId/:medicineId", addToCart)

// View Cart
router.get("/viewCart/:patientId",viewCart)

// Remove item from cart
router.delete("/removeFromCart/:patientId/:medicineId", removeFromCart)

// Update quantity in cart 
router.patch("/changeQuantityInCart/:patientId/:medicineId", changeQuantityInCart)




module.exports = router