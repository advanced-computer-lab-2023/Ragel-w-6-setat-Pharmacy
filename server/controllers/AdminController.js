const Pharmacist = require('../models/Pharmacist')
const Medicine = require('../models/Medicine')
const Patient = require('../models/Patient')
const Admin = require('../models/Admin')


const mongoose = require('mongoose');

//  add another admin 
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

//  remove pharmacist

const deletePharmacist = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no id" })
    }

    const pharmacist = await Pharmacist.findOneAndDelete({ _id: id })

    if (!Pharmacist) {
        return res.status(404).json({ error: "no Pharmacist" })
    }
    res.status(200).json(Pharmacist)

}

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

// view all pharmacists  
const getPharmacists = async (req, res) => {
    const pharm = await Pharmacist.find({}).sort({ createdAt: -1 })
    res.status(200).json(pharm)
}

// view all patients  
const getPatients = async (req, res) => {
    const patients = await Patient.find({}).sort({ createdAt: -1 })
    res.status(200).json(patients)
}

module.exports = {
    deletePatient,
    getMed,
    getPharmacists,
    getPatients,
    addAdmin,getAdmins,deletePharmacist
}