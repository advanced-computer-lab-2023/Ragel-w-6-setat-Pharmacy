const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const PharmacistReq = require('../models/PharmacistRequests')

const mongoose = require('mongoose');

// create a pharmacist Request
const createPharmacistRequest = async (req, res) => {
    const { status = false,
        name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground
    } = req.body

    try {
        const pharmReq = await PharmacistReq.create({
            name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, status

        })
        res.status(200).json(pharmReq)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Register as a pharmacist
const createPharmacist = async (req, res) => {
    const {
        name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground
    } = req.body

    try {
        const pharm = await PharmacistReq.create({
            name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground
        })
        res.status(200).json(pharm)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// View a list of all medicines (showing only the price, image, description)
const getAllMedicines = async (req, res) => {

    const medicine = await Medicine.find({}, 'image price description').sort({ createdAt: -1 });

    res.status(200).json(medicine)
}

// View the available quantity and sales of each medicine
const getQuantityAndSalesOfMedicine = async (req, res) => {
    try {
        const medicines = await Medicine.find({}).sort({ createdAt: -1 });

        const medicinesWithDetails = medicines.map((medicine) => {
            return {
                name: medicine.name,
                quantity: medicine.quantity,
                sales: medicine.totalSales
            };
        });

        res.status(200).json(medicinesWithDetails);
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


// Add a medicine 
const addMedicine = async (req, res) => {
    const { totalSales = 0,
        name, image, price, description, activeIngredient, quantity, medicinalUse,
    } = req.body;

    try {
        let imageData;
        if (!image) {
            const path = require('path')
            const fs = require("fs");

            const defaultImagePath = path.join(__dirname, "../resources/acl_pharma.png");
            const imageBuffer = fs.readFileSync(defaultImagePath);
            imageData = imageBuffer.toString("base64");
            //req.body.image = imageData;
        } else {
            // If image is provided, use it as base64 data
            imageData = image;
        }
        //res.json(imageData)
        // Create a new Medicine instance and save it to the database
        const medicine = new Medicine({
            name, image: imageData, price, description, activeIngredient, quantity, medicinalUse, totalSales
        });

        await medicine.save(); // Save the medicine to the database

        res.status(200).json(medicine); // Respond with the saved medicine object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Edit medicine details and price 
const editMedicine = async (req, res) => {
    const { id } = req.params;
    const { description, price } = req.body;

    try {
        const medicine = await Medicine.findByIdAndUpdate(
            id,
            { description, price },
            { new: true }
        );

        if (medicine.length === 0) {
            res.status(404).json({ error: 'Medicine not found' });
        } else {
            res.status(200).json(medicine);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPharmacistRequest,
    createPharmacist,
    getAllMedicines,
    getQuantityAndSalesOfMedicine,
    addMedicine,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getMedicinesByMedicinalUse,
    editMedicine
}