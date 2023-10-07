const mongoose= require('mongoose')

const Schema=mongoose.Schema

const pharmSchema= new Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    date_of_birth:{
        type:Date,
        required: true
    },
    hourly_rate:{
        type:Number,
        required: true
    },
    affiliation:{
        type:String,
        required: true
    },
    educational_background:{
        type:String,
        required: true
    },
   
},{timestamp: true})

module.exports=mongoose.model('Pharmacist',pharmSchema)
