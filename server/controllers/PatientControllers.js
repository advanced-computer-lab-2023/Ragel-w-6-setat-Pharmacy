const Patient = require('../models/Patient')
const Medicine = require('../models/Medicine')
//const EmergencyContact = require('../models/Patient') //it is stored there

const mongoose = require('mongoose');


// Register as a patient 
const createPatient = async (req, res) => {
    const {
        name, username, email, mobileNumber, password, dateOfBirth, gender, emergencyContact
    } = req.body
    try {
        const patient = await Patient.create({
            name, username, email, mobileNumber, password, dateOfBirth, gender, emergencyContact
        })
        res.status(200).json(patient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// View a list of a medicine (showing only the price, image, description)
const getAllMedicines = async (req, res) => {
    const medicine = await Medicine.find({}, 'name image price description medicinalUse').sort({ createdAt: -1 });
    res.status(200).json(medicine)
}

// Search for medicine based on name
const getMedicineByName = async (req, res) => {
    const { name } = req.query;

    try {
        const regex = new RegExp(`.*${name}.*`, 'i'); // 'i' flag for case-insensitive search
        const medicine = await Medicine.find({ name: regex });

        if (medicine.length === 0) {
            res.status(404).json({ error: 'Medicine not found' });
        } else {
            res.status(200).json(medicine);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter medicines based on medicinal use
const getMedicinesByMedicinalUse = async (req, res) => {
    const { medicinalUse } = req.query;

    try {
        const regex = new RegExp(`.*${medicinalUse}.*`, 'i'); // 'i' flag for case-insensitive search
        const medicine = await Medicine.find({ medicinalUse: regex });


        if (medicine.length === 0) {
            res.status(404).json({ error: 'No medicines found with the specified medicinal use' });
        } else {
            res.status(200).json(medicine);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add to cart  
const addToCart = async (req, res) => {
    const { patientId, medicineId } = req.params;
    try {
        // Find the patient by ID
        const patient = await Patient.findById(patientId);
        // Find the medicine by ID
        const medicine = await Medicine.findById(medicineId);

        if (!patient || !medicine) {
            return res.status(404).json({ message: 'Patient or medicine not found' });
        }

        // Check if the medicine object is valid
        if (!validateMedicineObject(medicine)) {
            return res.status(400).json({ message: 'Invalid medicine object' });
        }

        // Check if the medicine already exists in the patient's cart
        const cartItemIndex = patient.cart.items.findIndex(item => item.medicineId.toString() === medicineId);
        if (cartItemIndex !== -1) {
            // If the medicine already exists in the cart, increase its quantity
            patient.cart.items[cartItemIndex].quantity++;
        } else {
            // If the medicine is not in the cart, add it to the cart with quantity 1
            patient.cart.items.push({
                medicineId: medicineId,
                quantity: 1,
                price: medicine.price, // Assuming medicine has a price field
                name: medicine.name // Assuming medicine has a name field
            });
        }

        // Update totalQty and totalCost in the cart
        patient.cart.totalQty++;
        patient.cart.totalCost += medicine.price; // Assuming medicine has a price field

        // Save the updated patient document
        await patient.save();

        return res.status(200).json({ message: 'Medicine added to cart successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Helper method to addToCart
function validateMedicineObject(medicine) {

    if (medicine.quantity > 0) {
        return true;
    }
    return false;
}

// View Cart 
const viewCart = async (req, res) => {
    try {
        const { patientId } = req.params;
        // Find the patient by ID and populate the 'cart' field to get the complete cart details
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return { error: 'Patient not found' };
        }

        if (!patient.cart) {
            return { message: 'Cart is empty' };
        }

        return res.status(200).json(patient.cart);
       

        
    } catch (error) {
        // Handle any errors that occur during the database operation
        return { error: 'Error retrieving cart details' };
    }

};



// Remove a medicine from cart 
const removeFromCart = async (req, res) => {
    const { patientId, medicineId } = req.params;
    try {
        // Find the patient by ID
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Find the index of the medicine in the cart items array
        const cartItemIndex = patient.cart.items.findIndex(item => item.medicineId.toString() === medicineId);

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Medicine not found in the cart' });
        }

        // Get the removed medicine details before removing it from the cart
        const removedMedicine = patient.cart.items[cartItemIndex];

        // Remove the medicine from the cart items array
        patient.cart.items.splice(cartItemIndex, 1);

        // Update totalQty and totalCost in the cart
        patient.cart.totalQty -= removedMedicine.quantity;
        patient.cart.totalCost -= removedMedicine.price * removedMedicine.quantity;

        // Save the updated patient document
        await patient.save();

        return res.status(200).json({ message: 'Medicine removed from the cart successfully', removedMedicine });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Update the quantity of medicine in cart 
const changeQuantityInCart = async (req, res) => {
    const { patientId, medicineId } = req.params;
    const { quantityChange } = req.body;

    try {
        // Find the patient by ID
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
            console.log('here 1');
        }

        // Find the index of the medicine in the cart items array
        const cartItemIndex = patient.cart.items.findIndex(item => item.medicineId.toString() === medicineId);

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Medicine not found in the cart' });
            console.log('here 2');

        }

        // Get the current quantity and price of the medicine in the cart
        const currentQuantity = patient.cart.items[cartItemIndex].quantity;
        const medicinePrice = patient.cart.items[cartItemIndex].price;

        // Calculate the new quantity after applying the change
        const newQuantity = currentQuantity + quantityChange;

        // Check if the new quantity is non-negative
        if (newQuantity < 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Check if there is enough medicine in the database to match the requested quantity
        const availableMedicine = await Medicine.findById(medicineId);

        if (!availableMedicine || availableMedicine.quantity < newQuantity) {
            return res.status(400).json({ message: 'Not enough medicine in stock' });
        }

        // Update totalQty and totalCost in the cart based on the change in quantity
        patient.cart.totalQty += quantityChange;
        patient.cart.totalCost += quantityChange * medicinePrice;

        // Update the quantity of the medicine in the cart
        if (newQuantity === 0) {
            // If the new quantity is zero, remove the item from the cart
            patient.cart.items.splice(cartItemIndex, 1);
        } else {
            // Update the quantity of the medicine in the cart items array
            patient.cart.items[cartItemIndex].quantity = newQuantity;
        }

        // Save the updated patient document
        await patient.save();

        return res.status(200).json({ message: 'Medicine quantity in the cart updated successfully', newQuantity });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Allows patients to add new addresses
const addAddressToPatient = async (req, res) => {
    console.log('Received request:', req.body);
    const patientId = req.params.id;
    const { addresses } = req.body;

    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        patient.addresses.push(...addresses);

        await patient.save();

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Gets all addresses of a patient
const getPatientAddresses = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const addresses = patient.addresses;

        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Process payment
const processPayment = async (req, res) => {
    const { id } = req.params;
    const { paymentType, paymentAmount } = req.body;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        switch (paymentType) {
            case 'wallet':
                if (patient.payment.walletBalance >= paymentAmount) {
                    patient.payment.walletBalance -= paymentAmount;
                    await patient.save();
                    await handleSuccessfulPayment(patient); // Await here
                    res.status(200).json({ message: 'Payment with wallet balance successful' });
                } else {
                    res.status(400).json({ error: 'Insufficient funds in wallet. Please add funds or choose a different payment method.' });
                }
                break;
            case 'creditCard':
                try {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: paymentAmount * 100, // Stripe requires amount in cents
                        currency: 'usd',
                        payment_method: req.body.paymentMethodId,
                        confirm: true,
                        return_url: 'https://example.com/success', // Replace with your actual success URL
                    });

                    // Handle Stripe payment response accordingly
                    if (paymentIntent.status === 'succeeded') {
                        await handleSuccessfulPayment(patient); // Await here
                        res.status(200).json({ message: 'Credit card payment successful' });
                    } else {
                        res.status(400).json({ error: 'Credit card payment failed. Please check your card details and try again.' });
                    }
                } catch (error) {
                    res.status(400).json({ error: 'Credit card payment failed. Please check your card details and try again.' });
                }
                break;
            case 'cashOnDelivery':
                await handleSuccessfulPayment(patient); // Await here
                res.status(200).json({ message: 'Payment on delivery' });
                break;
            default:
                res.status(400).json({ error: 'Invalid payment type' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Increase medicine's total sales and decrease available quantity
const handleSuccessfulPayment = async (patient) => {
    try {
        const patientCart = patient.cart;

        // Check if cart is an object with items property
        if (patientCart && patientCart.items && Array.isArray(patientCart.items)) {
            // Create an array to store promises for each medicine update
            const updatePromises = [];

            // Update quantity and total sales for each item in the cart
            for (const cartItem of patientCart.items) {
                const updatePromise = (async () => {
                    const medicine = await Medicine.findById(cartItem.medicineId);
                    if (medicine) {
                        // Ensure quantity and total sales are updated correctly
                        const quantityToDecrease = Math.min(medicine.quantity, cartItem.quantity);
                        medicine.quantity -= quantityToDecrease;
                        medicine.totalSales += cartItem.quantity; // Update based on the cart quantity
                        await medicine.save();
                    }
                })();
                updatePromises.push(updatePromise);
            }

            // Wait for all medicine updates to complete
            await Promise.all(updatePromises);

            patient.orders.push({
                items: patient.cart.items,
                totalQty: patient.cart.totalQty,
                totalCost: patient.cart.totalCost,
                status: 'pending', // You can set the initial status as needed
            });

            // Clear the cart
            patient.cart.items = [];
            patient.cart.totalQty = 0;
            patient.cart.totalCost = 0;

            // Save the changes to the patient document
            await patient.save();
        }
    } catch (error) {
        console.error('Error handling successful payment:', error);
    }
};

// Checkout the patient's order (retrieve items in the cart)
const checkoutOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id).populate('cart.items.medicineId', 'name price'); // Populate the cart items with medicine details (name, price)

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Get items in the cart (medicineId, quantity, price, total) without populating (assuming you have cart stored in patient object)
        const cartItems = patient.cart.items.map(item => {
            return {
                medicine: item.medicineId,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            };
        });

        // Calculate total quantity and total cost
        const totalQty = patient.cart.totalQty;
        const totalCost = patient.cart.totalCost;

        res.status(200).json({ cartItems, totalQty, totalCost });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const viewPatientOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Extract all orders of the patient
        const patientOrders = patient.orders.map(order => {
            return {
                orderId: order._id,
                items: order.items,
                totalQty: order.totalQty,
                totalCost: order.totalCost,
                status: order.status,
                createdAt: order.createdAt,
            };
        });

        res.status(200).json(patientOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const cancelOrder = async (req, res) => {
    const { patientId, orderId } = req.params;

    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const orderIndex = patient.orders.findIndex((order) => order._id.toString() === orderId);

        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const canceledOrder = patient.orders[orderIndex];

        // Refund the total cost to the patient's wallet balance
        patient.payment.walletBalance += canceledOrder.totalCost;

        // Update order status to 'cancelled'
        canceledOrder.status = 'cancelled';

        await patient.save();

        res.status(200).json({ message: 'Order cancelled successfully. Refund processed to wallet balance.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get wallet balance of a patient
const getWalletBalance = async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const walletBalance = patient.payment.walletBalance;

        res.status(200).json({ walletBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
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
}

// update a patient ****
/*
const updatePatient= async (req,res)=>{
    const{id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no id"})
    }

    const patient= await Patient.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if (!patient){
        return res.status(404).json({error:"no patient"})
    }
    res.status(200).json(patient)
} */