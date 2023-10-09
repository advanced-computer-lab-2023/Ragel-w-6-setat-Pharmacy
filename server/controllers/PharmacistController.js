const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')

const mongoose = require('mongoose');

// Register as a pharmacist
const createPharmacist = async (req, res) => {
    const {
        name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground
    } = req.body
    try {
        const pharm = await Pharmacist.create({
            name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground

        })
        res.status(200).json(pharm)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// FIXME: View a list of all medicines (needs working on not complete) 
const getAllMedicines = async (req, res) => {

    const medicine = await Medicine.find({}).sort({ createdAt: -1 })
    res.status(200).json(medicine)
}

// View the available quantity and sales of each medicine
// FIXME: medicine model doesn't have a sales attribute
const getQuantityAndSalesOfMedicine = async (req, res) => {
    try {
        const medicines = await Medicine.find({}).sort({ createdAt: -1 });

        const medicinesWithDetails = medicines.map((medicine) => {
            return {
                name: medicine.name,
                quantity: medicine.quantity,
                sales: medicine.sales
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
        const medicine = await Medicine.find({ name });

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
        const medicines = await Medicine.find({ medicinalUse });

        if (medicines.length === 0) {
            res.status(404).json({ error: 'No medicines found with the specified medicinal use' });
        } else {
            res.status(200).json(medicines);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a medicine 
const addMedicine = async (req, res) => {
    const {
        name, image, price, description, activeIngredient, quantity, medicinalUse, totalSales
    } = req.body
    try {
        const medicine = await Medicine.create({
            name, image, price, description, activeIngredient, quantity, medicinalUse, totalSales

        })
        res.status(200).json(medicine)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// TODO: edit medicine details and price 

module.exports = {
    createPharmacist,
    getAllMedicines,
    getQuantityAndSalesOfMedicine,
    addMedicine,
    getMedicineByName,
    getMedicinesByMedicinalUse
    // TODO: edit medicine details and price

}