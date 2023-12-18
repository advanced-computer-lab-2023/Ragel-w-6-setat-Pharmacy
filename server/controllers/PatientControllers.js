const Patient = require('../models/Patient')
const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Prescription = require('../models/Prescription')


//const EmergencyContact = require('../models/Patient') //it is stored there

const mongoose = require('mongoose');

// Register as a patient 
const createPatient = async (req, res) => {
    const {
        name, username, email, mobileNumber, password, dateOfBirth, gender, emergencyContact, addresses
    } = req.body
    try {
        const patient = await Patient.create({
            name, username, email, mobileNumber, password, dateOfBirth, gender, emergencyContact, addresses,
            payment: {
                method: 'cashOnDelivery',
                walletBalance: 0
            },
            orders: []
        })

        const role = 'patient';
        // FIXME: FIX THIS (patient gets added to patient, then checks if password is valid even tho he was added)
        const user = await User.create({ username, password, role });

        res.status(200).json(patient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get one patient's info using his ID
const getPatientInfo = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Validate patientId
        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required' });
        }

        // Fetch patient details from the database
        const patientDetails = await Patient.find(patientId);

        // Check if the patient with the given ID exists
        if (!patientDetails) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // If patient details are found, send them in the response
        res.status(200).json({ patient: patientDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// View a list of medicines (showing only the price, image, description) with archived attribute set to false

// View a list of medicines (showing only the price, image, description) with archived attribute set to false
const getAllMedicines = async (req, res) => {
    try {
        const medicine = await Medicine.find({ archived: false }, 'name image price description medicinalUse')
            .sort({ createdAt: -1 });

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



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

// View Alternative Medicine based on active ingredient 
const medAlternative = async (req, res) => {
    try {
        const { medicineId } = req.params;

        // Check if the requested medicine is out of stock
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        if (medicine.outOfStock) {
            // If out of stock, suggest similar medicines based on active ingredient
            const similarMedicines = await Medicine.find({
                activeIngredient: medicine.activeIngredient,
                outOfStock: false,
            });

            if (similarMedicines.length > 0) {
                return res.status(200).json({
                    message: 'Medicine is out of stock. Here are some alternatives:',
                    alternatives: similarMedicines,
                });
            } else {
                return res.status(404).json({
                    message: 'Medicine is out of stock, and no alternatives are available.',
                });
            }
        } else {
            // If not out of stock, return the medicine details
            return res.status(200).json({
                message: 'Medicine is in stock.',
                medicineDetails: medicine,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
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

        // Check if the medicine is out of stock
        if (medicine.outOfStock) {
            return res.status(400).json({ message: 'Medicine is out of stock' });
        }

        // if(medicine.overTheCounter){
        //     return res.status(400).json({ message: 'Medicine is over the counter' });

        // }
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

const processCreditCardPayment = async (res, items) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name, // Adjust this based on your item data
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe requires amount in cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/patient/orders`,
            cancel_url: `${process.env.CLIENT_URL}/patient/checkout`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe payment error:', error);
        res.status(400).json({ error: 'Credit card payment failed. Please check your card details and try again.', details: error.message });
    }
};

const processPayment = async (req, res) => {
    const { id } = req.params;
    const { paymentType, items, paymentMethodId } = req.body;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        switch (paymentType) {
            case 'wallet':
                if (patient.payment.walletBalance >= patient.cart.totalCost) {
                    patient.payment.walletBalance -= patient.cart.totalCost;
                    await patient.save();
                    await handleSuccessfulPayment(patient);
                    res.status(200).json({ message: 'Payment with wallet balance successful' });
                } else {
                    res.status(400).json({ error: 'Insufficient funds in wallet. Please add funds or choose a different payment method.' });
                }
                break;
            case 'creditCard':
                await processCreditCardPayment(res, items);
                await handleSuccessfulPayment(patient);
                break;
            case 'cashOnDelivery':
                await handleSuccessfulPayment(patient);
                res.status(200).json({ message: 'Payment on delivery' });
                break;
            default:
                res.status(400).json({ error: 'Invalid payment type' });
        }
    } catch (error) {
        console.error('Process payment error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '3projectalpha3@gmail.com',
        pass: 'ncgo dehg lebs zazh'
    }
});

const emailPharmacistOutOfStock = async (medicine) => {


    //TODO send email to all pharmacists
    //write  a method to call all pharmacist emails (bypass if null or empty) and send email

    try {
        if (!medicine) {
            console.log('No medicine provided.');
            return;
        }

        const subject = 'Medicine Out of Stock Notification';
        const text = `\n\nThe medicine ${medicine.name} is currently out of stock. Please take appropriate action.`;

        const pharmacistEmails = await Pharmacist.find({}, 'email').exec();


        if (!pharmacistEmails.length) {
            console.log('No pharmacist emails available.');
            return;
        }

        const mailOptions = {
            from: '3projectalpha3@gmail.com',
            to: pharmacistEmails.join(','), // Join the pharmacist emails with a comma
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent to pharmacists successfully.');
    } catch (error) {
        console.error('Error sending email to pharmacists:', error);
    }

}

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
                        if (medicine.quantity <= 0) {
                            medicine.outOfStock = true;
                            emailPharmacistOutOfStock(medicine);
                            //TODO send email to all pharmacists
                            //write  a method to call all pharmacist emails (bypass if null or empty) and send email


                        }
                        medicine.totalSales += cartItem.quantity; // Update based on the cart quantity
                        medicine.sales.push({
                            saleDate: new Date(),
                            quantitySold: cartItem.quantity,
                        });
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
                name: item.name,
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

        // Decrement the quantity sold for each item in the canceled order
        for (const cartItem of canceledOrder.items) {
            const medicine = await Medicine.findById(cartItem.medicineId);
            if (medicine) {
                const quantityToIncrement = Math.min(medicine.quantity, cartItem.quantity);
                medicine.quantity += quantityToIncrement;
                medicine.totalSales -= cartItem.quantity; // Decrement based on the canceled order quantity
                // Remove the last sale entry corresponding to the canceled order
                medicine.sales.pop();
                await medicine.save();
            }
        }

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

// Change password for Patient
const changePatientPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(newPassword)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' });
        }
        // Find the patient by username and update only the password
        const updatedPatient = await Patient.findOneAndUpdate(
            { username },
            { $set: { password: newPassword } },
            { new: true, runValidators: false } // Use runValidators: false to bypass schema validation
        );
        const user = await User.findOne({ username });
        user.password = await bcrypt.hash(newPassword, 10);


        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};



const viewPrescription = async (req, res) => {
    const patientId = req.params.id;
    const { exported } = req.query;

    try {
        const patient = await Patient.findById(patientId);

        const filter = {
            patient: patientId,
            ...(exported === 'true' && { exported: true }),
        };

        const projection = {
            _id: 1,
            medication: 1,
        };

        const prescriptions = await Prescription.find(filter, projection);

        res.status(200).json({
            status: 'success',
            prescriptions: prescriptions.map(({ _id, medication }) => ({ _id, medication })),
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};


const addPrescriptionToCart = async (req, res) => {
    const patientId = req.params.id;
    const { prescriptionId } = req.body;

    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const prescription = await Prescription.findById(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        // Check if prescription.medication is iterable
        if (!prescription.medication || !prescription.medication[Symbol.iterator]) {
            return res.status(400).json({ error: 'Invalid prescription format' });
        }

        for (const prescriptionMedicine of prescription.medication) {
            const medicine = await Medicine.findOne({ name: prescriptionMedicine.name });

            if (medicine) {
                if (medicine.quantity > 0) {
                    patient.cart.items.push({
                        medicineId: medicine._id,
                        quantity: 1, // You may want to adjust this based on your requirements
                        price: prescriptionMedicine.price,
                        name: medicine.name,
                    });
                } else {
                    console.log(`Medicine '${medicine.name}' is out of stock and not added to the cart.`);
                }
            }
        }

        // Set the prescription's exported field to false
        prescription.exported = false;

        // Alternatively, you can delete the prescription
        // await prescription.remove();

        await Promise.all([patient.save(), prescription.save()]);

        res.status(200).json({ message: 'Prescription medicines added to the cart successfully' });
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
    changePatientPassword,
    medAlternative,
    viewPrescription,
    getPatientInfo,
    addPrescriptionToCart,




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