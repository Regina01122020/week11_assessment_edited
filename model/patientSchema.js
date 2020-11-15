const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const Users = mongoose.model("Patients", patientSchema)
module.exports = Users