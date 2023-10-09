const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')

const mongoose = require('mongoose');

// TODO: Add another administrator

// TODO: Delete a pharmacist

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
    // TODO: Add administrator
    // TODO: Delete a pharmacist
    deletePatient,
    // TODO: View all information uploaded by pharmacist to apply to join the platform
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    getPharmacistsInfo,
    getPatientsInfo,
    getSinglePatientInfo,
    getSinglePharmacistInfo

}