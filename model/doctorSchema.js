const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Users = mongoose.model("Doctors", doctorSchema)
module.exports = Users