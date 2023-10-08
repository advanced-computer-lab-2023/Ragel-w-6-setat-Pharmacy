const Patient = require('../models/Patient')
const Medicine = require('../models/Medicine')

const mongoose = require('mongoose');

// register a pateint 
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

// TO UPDATE: get all medicines (needs working on not complete )---> fadel search wa filter 
const getMed = async (req, res) => {
    const medicine = await Medicine.find({}).sort({ createdAt: -1 })
    res.status(200).json(medicine)
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
}
*/

module.exports = {
    createPatient,
    getMed
}