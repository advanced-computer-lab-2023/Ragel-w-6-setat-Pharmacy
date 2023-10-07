const mongoose= require('mongoose')

const Schema=mongoose.Schema

const medSchema= new Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:Buffer,
        contentType:String
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    active_ingredient:{
        type:String,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    medicinal_use:{
        type:String,
        required: true
    },
    
   
},{timestamp: true})

module.exports=mongoose.model('Medicine',medSchema)
