const mongoose= require('mongoose')

const Schema=mongoose.Schema

const patientSchema= new Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date_of_birth:{
        type:Date,
        required: true
    },
    gender:{
        type:String,
        enum:"Male"|| "Female",
        required: true
    },
    mobile_number:{
        type:Number,
        required:true,
        maxlength:10
    },
    emergency_contact:{
       name:String,
       mobile_number:Number,
       relation_to:String
    }
},{timestamp: true})

module.exports=mongoose.model('Patient',patientSchema)
