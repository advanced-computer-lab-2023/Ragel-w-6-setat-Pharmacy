const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')
const Admin = require('../models/Admin')


const mongoose = require('mongoose');
const PharmacistRequests = require('../models/PharmacistRequests');

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

//view admins

const getAdmins = async (req, res) => {
    const admin = await Admin.find({}).sort({ createdAt: -1 })
    res.status(200).json(admin)
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

// TODO: View all information uploaded by pharmacist to apply to join the platform

const getPharmacistsRequestsInfo = async (req, res) => {
    const pharmReq = await PharmacistRequests.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharmReq)
}

// view a list of a medicine (showing only the price,image,description)
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
const getSinglePharmacistInfo=async(req,res)=>{
    const{id}=req.params
if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"no id"})
}
    const pharm= await Pharmacist.findById(id)

    if (!pharm){
        return res.status(404).json({error:"no pharmacist available "})
    }
    res.status(200).json(pharm)
}

// View all Patients Information 
const getPatientsInfo = async (req, res) => {

    const patients = await Patient.find({}).sort({ createdAt: -1 })
    res.status(200).json(patients)
}

// View a Single Patient's Information 
const getSinglePatientInfo=async(req,res)=>{
    const{id}=req.params
if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"no id"})
}
    const patient= await Patient.findById(id)

    if (!patient){
        return res.status(404).json({error:"no patient"})
    }
    res.status(200).json(patient)
}


module.exports = {
    deletePatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getPharmacistsInfo,
    getPatientsInfo,
    getSinglePatientInfo,
    getSinglePharmacistInfo
,
    addAdmin,getAdmins,deletePharmacist , getPharmacistsRequestsInfo, deleteAdmin
}