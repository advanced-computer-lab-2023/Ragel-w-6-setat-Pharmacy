const express = require('express')

const {
    createPatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    addToCart,
    viewCart,
    removeFromCart,
    changeQuantityInCart,
    checkoutOrder,
    viewPatientOrders,
    cancelOrder,
    getWalletBalance,
    addAddressToPatient,
    getPatientAddresses,
    processPayment,
    changePatientPassword,
    medAlternative
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
router.get("/viewCart/:patientId", viewCart)

// Remove item from cart
router.delete("/removeFromCart/:patientId/:medicineId", removeFromCart)

// Update quantity in cart 
router.patch("/changeQuantityInCart/:patientId/:medicineId", changeQuantityInCart)

router.get('/checkoutOrder/:id', checkoutOrder);

// View order details
router.get('/viewPatientOrders/:id', viewPatientOrders);

// Cancel an order
router.put('/cancelOrder/:patientId/:orderId', cancelOrder);

// Get wallet balance of a patient
router.get('/getWalletBalance/:patientId', getWalletBalance);

// Add address(es) to patient
router.post("/addAddressToPatient/:id", addAddressToPatient);

// Get all addresses of a patient
router.get("/getPatientAddresses/:id", getPatientAddresses);

// Pay with wallet
router.post("/processPayment/:id", processPayment);

// Change patient's password
router.post('/changePatientPassword', changePatientPassword);


router.post('/medAlternatives/:medicineId',medAlternative)


module.exports = router