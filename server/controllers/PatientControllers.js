const Patient = require('../models/Patient')
const Medicine = require('../models/Medicine')

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

// FIXME: View a list of all medicines (needs working on not complete)
const getAllMedicines = async (req, res) => {

    const medicine = await Medicine.find({}).sort({ createdAt: -1 })
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

module.exports = {
    createPatient,
    getAllMedicines,
    getMedicineByName,
    getMedicinesByMedicinalUse
}


// get a single patient***
/*
const getSinglePatient=async(req,res)=>{
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
*/

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


