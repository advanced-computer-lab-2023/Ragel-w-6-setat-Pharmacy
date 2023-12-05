const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')
const Admin = require('../models/Admin')
const PharmacistRequests = require('../models/PharmacistRequests');
const EmergencyContact = require('../models/Patient'); //it is stored there
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// FIXME man needing an email in admin lmao and making it unique?? bruhhhhhh
// Add another administrator
const addAdmin = async (req, res) => {
    const { username, password } = req.body;
    let existingUsername; // Declare the variable here
    try {
        // Check if username is already in use
        const existingUsernameAdmin = await Admin.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already in use. in admin' + existingUsernameAdmin });
        }

        // Check if username is already in use
        existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already in use.' + existingUsername });
        }

        // Check if password is valid
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const role = 'admin';

        const user = await User.create({ username, password: hashedPassword, role });
        const admin = await Admin.create({ username, password });

        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View admins
const getAdmins = async (req, res) => {
    const admin = await Admin.find({}).sort({ createdAt: -1 })
    res.status(200).json(admin)  // array of documents in the database
}

// Delete admin
const deleteAdmin = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no id" })
    }

    const admin = await Admin.findOneAndDelete({ _id: id })

    if (!admin) {
        return res.status(404).json({ error: "no Admin" })
    }
    res.status(200).json(admin)
}

// Delete admin using username
const deleteAdminByUsername = async (req, res) => {
    const usernameToDelete = req.params.username;

    try {
        // Find the user by username and delete it
        const deletedUser = await Admin.findOneAndDelete({ username: usernameToDelete });
        // console.log("admin to be deleted: "+ deletedUser)
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: deletedUser.username + " deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

// Delete a pharmacist
const deletePharmacist = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no id" })
    }

    const pharmacist = await Pharmacist.findOneAndDelete({ _id: id })

    if (!pharmacist) {
        return res.status(404).json({ error: "no Pharmacist" })
    }
    res.status(200).json(pharmacist)
}

// Delete pharmacist by name
const deletePharmacistByUsername = async (req, res) => {
    const usernameToDelete = req.params.username;

    try {
        // Find the user by username and delete it
        const deletedUser = await Pharmacist.findOneAndDelete({ username: usernameToDelete });
        // console.log("Pharmacist to be deleted: "+ deletedUser)
        if (!deletedUser) {
            return res.status(404).json({ error: "Pharmacist username not found" });
        }

        return res.status(200).json({ message: deletedUser.username + " deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

// Delete a patient 
const deletePatient = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no id" })
    }

    const patient = await Patient.findOneAndDelete({ _id: id })

    if (!patient) {
        return res.status(404).json({ error: "no patient" })
    }
    res.status(200).json(patient)
}

// Delete patient by name   
const deletePatientByUsername = async (req, res) => {
    const usernameToDelete = req.params.username;

    try {
        // Find the user by username and delete it
        const deletedUser = await Patient.findOneAndDelete({ username: usernameToDelete });
        // console.log("Patient to be deleted: "+ deletedUser)
        if (!deletedUser) {
            return res.status(404).json({ error: "Patient username not found" });
        }

        return res.status(200).json({ message: deletedUser.username + " deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

// TODO Delete an emergency contact?

// View all information uploaded by pharmacist to apply to join the platform
const getPharmacistsRequestsInfo = async (req, res) => {
    const pharmReq = await PharmacistRequests.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharmReq)
}

// View a list of all medicines (showing only the price, image, description)
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

// View all pharmacists information
const getPharmacistsInfo = async (req, res) => {
    const pharm = await Pharmacist.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharm)
}

// View a single pharmacist information
const getSinglePharmacistInfo = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no id" })
    }
    const pharm = await Pharmacist.findById(id)

    if (!pharm) {
        return res.status(404).json({ error: "no pharmacist available " })
    }
    res.status(200).json(pharm)
}

// View all patients information 
const getPatientsInfo = async (req, res) => {
    const patients = await Patient.find({}).sort({ createdAt: -1 })
    res.status(200).json(patients)
}

// TODO View all patients emergency contacts information?

// View a single patient's information 
const getSinglePatientInfo = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no id" })
    }
    const patient = await Patient.findById(id)

    if (!patient) {
        return res.status(404).json({ error: "no patient" })
    }
    res.status(200).json(patient)
}

// TODO View patient's emergency contacts information?

// FIXME ask admin to enter old password, authenticate it matches minimum 
// Change password for admin
const changeAdminPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(newPassword)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain an uppercase letter and a digit.' + newPassword });
        }

        // Change the password
        admin.password = newPassword;

        const user = await User.findOne({ username });
        user.password = await bcrypt.hash(newPassword, 10);

        // Save the updated password
        await admin.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

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
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'pharmacist';
        const user = await User.create({ username, email, password: hashedPassword, role });
        res.status(200).json(pharm)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const rejectPharmacistRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        // Find the request by its ID and remove it
        const deletedRequest = await PharmacistRequests.findByIdAndRemove(requestId);

        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Pharmacist request rejected and removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
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

module.exports = {
    deletePatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getPharmacistsInfo,
    getPatientsInfo,
    getSinglePatientInfo,
    getSinglePharmacistInfo,
    addAdmin,
    getAdmins,
    deletePharmacist,
    getPharmacistsRequestsInfo,
    deleteAdmin,
    deleteAdminByUsername,
    deletePatientByUsername,
    deletePharmacistByUsername,
    changeAdminPassword,
    createPharmacist,
    rejectPharmacistRequest,
    getTotalSalesReport
}

// TODO deleteEmergencyContact
// TODO viewAllEmergencyContacts
// TODO viewSingleEmergencyContact