const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')

const mongoose = require('mongoose');

// TODO: add another admin 

// TODO: remove pharmacist

// delete a patient 
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

// TODO: view all info uploaded by pharmacist 

// TO UPDATE: get all medicines (needs working on not complete )---> fadel search wa filter 
const getMed = async (req, res) => {
    const medicine = await Medicine.find({}).sort({ createdAt: -1 })
    res.status(200).json(medicine)
}

// view pharmacist info 
const getPharmacist = async (req, res) => {
    const pharm = await Pharmacist.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharm)
}

// view patient info 
const getPatients = async (req, res) => {
    const patients = await Patient.find({}).sort({ createdAt: -1 })
    res.status(200).json(patients)
}

module.exports = {
    deletePatient,
    getMed,
    getPharmacist,
    getPatients
}