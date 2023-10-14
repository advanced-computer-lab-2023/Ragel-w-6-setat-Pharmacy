const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')
const Admin = require('../models/Admin')
const PharmacistRequests = require('../models/PharmacistRequests');
const EmergencyContact = require('../models/Patient'); //it is stored there

const mongoose = require('mongoose');

// Add another administrator
const addAdmin = async (req, res) => {
    const {
        username, password
    } = req.body
    try {
        const admin = await Admin.create({
            username, password
        })
        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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

//Delete admin using username
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

// Delete Pharmacist by Name

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

// Delete Patient by Name   

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

//TODO Delete an emergency contact?

// View all information uploaded by pharmacist to apply to join the platform
const getPharmacistsRequestsInfo = async (req, res) => {
    const pharmReq = await PharmacistRequests.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharmReq)
}

// View a list of all medicines (showing only the price, image, description)
const getAllMedicines = async (req, res) => {
    const medicine = await Medicine.find({}, 'image price description').sort({ createdAt: -1 });
    res.status(200).json(medicine)
}

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

// View all Pharmacists Information
const getPharmacistsInfo = async (req, res) => {
    const pharm = await Pharmacist.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharm)
}

// View a single Pharmacist Information
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

// View all Patients Information 

const getPatientsInfo = async (req, res) => {

    const patients = await Patient.find({}).sort({ createdAt: -1 })
    res.status(200).json(patients)
}

//TODO View all Patients Emergency Contacts Information?

// View a Single Patient's Information 
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

//TODO View  Patient Emergency Contacts Information?

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
    deletePatientByUsername, //TODO fix it to be by username
    deletePharmacistByUsername

}

//TODO deleteEmergencyContact
//TODO viewAllEmergencyContacts
//TODO viewSingleEmergencyContact