const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true,'Please add a name']
    },
    lastName: {
        type: String,
        required:[true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique:true
    },
    password: {
        type: String,
        required: [true,'Please add a password']
    },
    userImage: {
        type: String,
        required: false
    },
    neighborhood: {
        type: String,
        required:false
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    mercadopagoAccessToken: {
        type: String,
        required:false
    },
    mercadopagoRefreshToken: {
        type: String,
        required:false
    }
},  
{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)