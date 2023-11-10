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
//moved this to admin controller
// Register as a pharmacist
/* const createPharmacist = async (req, res) => {
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
} */

// View a list of all medicines (showing only the price, image, description)
const getAllMedicines = async (req, res) => {
    const medicine = await Medicine.find({}, 'name image price description medicinalUse').sort({ createdAt: -1 });
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
    const {
        totalSales = 0,
        name,
        image,
        price,
        description,
        activeIngredient,
        quantity,
        medicinalUse,
    } = req.body;

    try {
        let existingMedicine = await Medicine.findOne({ name });

        if (existingMedicine) {
            // If medicine with the same name exists, increase the quantity
            existingMedicine.quantity += quantity;
            await existingMedicine.save();
            res.status(200).json(existingMedicine);
        } else {
            // If medicine with the given name doesn't exist, create a new medicine
            let imageData;
            if (!image) {
                const path = require('path');
                const fs = require('fs');

                const defaultImagePath = path.join(__dirname, '../resources/acl_pharma.png');
                const imageBuffer = fs.readFileSync(defaultImagePath);
                imageData = imageBuffer.toString('base64');
            } else {
                imageData = image;
            }

            // Create a new Medicine instance and save it to the database
            const newMedicine = new Medicine({
                name,
                image: imageData,
                price,
                description,
                activeIngredient,
                quantity,
                medicinalUse,
                totalSales,
            });

            await newMedicine.save();
            res.status(200).json(newMedicine);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 

// Edit medicine details and price (we changed it to find by name 
//however its supposed to be find by id thru url)
const editMedicine = async (req, res) => {
    // const { id } = req.params;
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

//Upload documents: national ID, pharmacy degree and working license
const uploadNationalId = async (req, res) => {
    try {
      const { file } = req;
      const { userId } = req.session; // Assuming you have a userId in the session
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
  
      // Update the user's `nationalId` field in the database
      await Pharmacist.updateOne(
        { _id: userId },
        { $set: { nationalId: file.path } }
      );
  
      res.send({
        file: file.originalname,
        path: file.path,
        size: file.size,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error in adding nationalId in pharmacist" });
    }
  };

const uploadPharmacyDegree = async (req, res) => {
    try {
      const { file } = req;
      const { userId } = req.session; // Assuming you have a userId in the session
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
  
      // Update the user's `nationalId` field in the database
      await Pharmacist.updateOne(
        { _id: userId },
        { $set: { pharmacyDegree: file.path } }
      );
  
      res.send({
        file: file.originalname,
        path: file.path,
        size: file.size,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error in adding pharmacyDegree in pharmacist" });
    }
  };

const uploadWorkingLicense= async (req, res) => {
    try {
      const { file } = req;
      const { userId } = req.session; // Assuming you have a userId in the session
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
  
      // Update the user's `nationalId` field in the database
      await Pharmacist.updateOne(
        { _id: userId },
        { $set: { workingLicense: file.path } }
      );
  
      res.send({
        file: file.originalname,
        path: file.path,
        size: file.size,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error in adding workingLicense in pharmacist" });
    }
  };

module.exports = {
    createPharmacistRequest,
  //  createPharmacist,
    getAllMedicines,
    getQuantityAndSalesOfMedicine,
    addMedicine,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getMedicinesByMedicinalUse,
    editMedicine,
    uploadNationalId,
    uploadPharmacyDegree,
    uploadWorkingLicense
}