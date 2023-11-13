const express = require('express');
const {
    createPatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    addToCart,
    viewCart,
    addAddressToPatient,
    getPatientAddresses,
    processPayment,
    checkoutOrder,
    viewPatientOrders,
    cancelOrder,
    getWalletBalance
} = require('../controllers/PatientControllers');

const router = express.Router();

// Register as a patient
router.post('/', createPatient);

// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines);

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName);

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse);

// Add medicine to a patient's cart
router.post('/addToCart/:patientId/:medicineId', addToCart);

// View cart items
router.get("/viewCart/:id", viewCart);

// Add address(es) to patient
router.post("/addAddressToPatient/:id", addAddressToPatient);

// Get all addresses of a patient
router.get("/getPatientAddresses/:id", getPatientAddresses);

// Pay with wallet
router.post("/processPayment/:id", processPayment);

// Checkout the patient's order
router.get('/checkoutOrder/:id', checkoutOrder);

// View order details
router.get('/viewPatientOrders/:id', viewPatientOrders);

// Cancel an order
router.put('/cancelOrder/:patientId/:orderId', cancelOrder);

// Get wallet balance of a patient
router.get('/getWalletBalance/:patientId', getWalletBalance);

module.exports = router;