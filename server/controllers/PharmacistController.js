const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const PharmacistReq = require('../models/PharmacistRequests')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Request to become a pharmacist
const createPharmacistRequest = async (req, res) => {
    const { status = false,
        name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground
    } = req.body

    // Access file buffers from req.files
    const ID = req.files.ID[0].filename;
    const workingLicense = req.files.workingLicense[0].filename;
    const pharmacyDegree = req.files.pharmacyDegree[0].filename;

    try {
        const pharmReq = await PharmacistReq.create({
            name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, status, ID, workingLicense, pharmacyDegree
        })
        res.status(200).json(pharmReq)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Register as a pharmacist
const createPharmacist = async (req, res) => {
    const {
        name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, ID, workingLicense, pharmacyDegree
    } = req.body
    const status = false;
    // Access file buffers from req.files
    // Access file buffers from req.files
    // Access file buffers from req.files
    /* const ID = req.files.ID[0].filename;
    const workingLicense = req.files.workingLicense[0].filename;
    const pharmacyDegree = req.files.pharmacyDegree[0].filename; */

    //since we can only create pharmacist from admin i just pass the name directly from the body
    try {
        const pharm = await Pharmacist.create({
            name, username, email, status, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, ID, workingLicense, pharmacyDegree
        })
        res.status(200).json(pharm)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// View a list of all medicines (showing only the price, image, description)
const getAllMedicines = async (req, res) => {
    const medicine = await Medicine.find({}, 'name image price description medicinalUse archived').sort({ createdAt: -1 });
    res.status(200).json(medicine)
}

// View a list of all medicines (showing only the price, image, description)
const getAllMedicinesOutOfStock = async (req, res) => {
    const medicine = await Medicine.find({outOfStock:true}, 'name image price description medicinalUse archived').sort({ createdAt: -1 });
    res.status(200).json(medicine)
}

// Archive medicine
const archiveMedicine = async (req, res) => {
    const { id } = req.params;

    try {
        const medicine = await Medicine.findByIdAndUpdate(
            id,
            { archived: true },
            // { new: true }
        );

        if (!medicine) {
            res.status(404).json({ error: 'Medicine not found' });
        } else {
            res.status(200).json(medicine);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unarchive medicine
const unarchiveMedicine = async (req, res) => {
    const { id } = req.params;

    try {
        const medicine = await Medicine.findByIdAndUpdate(
            id,
            { archived: false },
            // { new: true }
        );

        if (!medicine) {
            res.status(404).json({ error: 'Medicine not found' });
        } else {
            res.status(200).json(medicine);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
            if (medicine.length === 0) {
                res.status(404).json({ error: 'No medicines found with the specified medicinal use' });
            } else {
                res.status(200).json(medicine);
                res.status(200).json(medicine);
            }

        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a medicine 
const addMedicine = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
  
        console.log('Request Body:', req.body);
        const {
            totalSales = 0,
            archived=false,
            outOfStock=false,
            name,
            price,
            description,
            activeIngredient,
            quantity,
            medicinalUse,
            outOfStock=false
          } = req.body;
  
        let imageData;
  
        if (req.file) {
            imageData= `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            
        } else {
          const path = require('path');
          const fs = require('fs');
  
          const defaultImagePath = path.join(__dirname, '../resources/acl_pharma.png');
          const imageBuffer = fs.readFileSync(defaultImagePath);
          imageData = imageBuffer.toString('base64');
        }
  
        
  
        let existingMedicine = await Medicine.findOne({ name });
  
        if (existingMedicine) {
          existingMedicine.quantity += quantity;
          await existingMedicine.save();
          res.status(200).json(existingMedicine);
        } else {
          const newMedicine = new Medicine({
            name,
            image:imageData,
            price,
            description,
            activeIngredient,
            quantity,
            medicinalUse,
            totalSales,
            archived,
            outOfStock
          });
  
          await newMedicine.save();
          res.status(200).json(newMedicine);
        }
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Edit medicine details and price (we changed it to find by name 
//however its supposed to be find by id thru url)
const editMedicine = async (req, res) => {
    const { id } = req.params;
    const { description, price, name } = req.body;

    try {
        const medicine = await Medicine.findOneAndUpdate(
            { name },
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

// Change password for Pharmacist
const changePharmacistPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        // Find the admin by username
        const pharmacist = await Pharmacist.findOne({ username });

        if (!pharmacist) {
            return res.status(404).json({ error: "Pharmacist not found" });
        }
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(newPassword)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' });
        }

        const user = await User.findOne({ username });
        // Change the password
        pharmacist.password = newPassword;
        user.password = await bcrypt.hash(newPassword, 10);

        // Save the updated password
        await pharmacist.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get total sales report based on a chosen month
const getTotalSalesReport = async (req, res) => {
    try {
        const { month, year } = req.query;

        // Validate the input parameters (month and year)
        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required parameters.' });
        }

        // Convert month name to a JavaScript Date object
        const startDate = new Date(`${month} 1, ${year}`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999);

        // Query the database to get total sales within the specified month
        const totalSales = await Medicine.aggregate([
            {
                $unwind: '$sales',
            },
            {
                $match: {
                    'sales.saleDate': { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: '$name',
                    totalSales: { $sum: '$sales.quantitySold' },
                    sales: { $push: '$sales.quantitySold' },
                },
            },
            {
                $project: {
                    _id: 0,
                    medicineName: '$_id',
                    totalSales: 1,
                    sales: 1,
                },
            },
        ]);

        const grandTotalSales = totalSales.reduce((acc, medicine) => acc + medicine.totalSales, 0);

        // Return a response with totalSales property even if it's 0
        res.status(200).json({ totalSales: grandTotalSales, medicines: totalSales });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Filter sales report based on medicine and date sold
const getFilteredSalesReport = async (req, res) => {
    try {
        const { medicine, startDate, endDate } = req.query;

        // Validate the input parameters (medicine, startDate, and endDate)
        if (!medicine || !startDate || !endDate) {
            return res.status(400).json({ error: 'Medicine, startDate, and endDate are required parameters.' });
        }

        // Convert startDate and endDate to JavaScript Date objects
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        // Query the database to get sales within the specified medicine and date range
        const filteredSales = await Medicine.aggregate([
            {
                $unwind: '$sales',
            },
            {
                $match: {
                    'name': medicine,
                    'sales.saleDate': { $gte: startDateTime, $lte: endDateTime },
                },
            },
            {
                $project: {
                    _id: 0,
                    medicineName: '$name',
                    totalSales: '$sales.quantitySold',
                    saleDate: '$sales.saleDate',
                },
            },
        ]);

        // if (filteredSales.length === 0) {
        //     return res.status(404).json({ message: 'No sales found for the specified medicine and date range.' });
        // }

        const grandTotalSales = filteredSales.reduce((acc, sale) => acc + sale.totalSales, 0);

        res.status(200).json({ totalSales: grandTotalSales, sales: filteredSales });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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
    editMedicine,
    changePharmacistPassword,
    archiveMedicine,
    unarchiveMedicine,
    getAllMedicinesOutOfStock,
    getTotalSalesReport,
    getFilteredSalesReport
}