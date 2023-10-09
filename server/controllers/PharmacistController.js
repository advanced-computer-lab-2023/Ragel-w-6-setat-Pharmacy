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
            name, username, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground,status

        })
        res.status(200).json(pharmReq)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// create a pharmacist
const createPharmacist = async (req, res) => {
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
}

// FIXME: get all medicines (needs working on not complete )---> fadel search wa filter wa userstory 13 
const getMed = async (req, res) => {
    const medicine = await Medicine.find({}).sort({ createdAt: -1 })
    res.status(200).json(medicine)
}

// add a medicine 
const addMed = async (req, res) => {
    const {
        name, image, price, description, activeIngredient, quantity, medicinalUse
    } = req.body
    try {
        const medicine = await Medicine.create({
            name, image, price, description, activeIngredient, quantity, medicinalUse
        })
        res.status(200).json(medicine)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// TODO: edit medicine details and price 

module.exports = {
    createPharmacistRequest,
    getMed,
    addMed
}