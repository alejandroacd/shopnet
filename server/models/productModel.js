const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    userId: {
        type: String,
        required:false
    },

    productName:{
        type: String,
        required:true
    },
    description: {
        type:String,
        required: false
    },
    price: {
        type: Number,
        required:true
    },
    categorie: {
        type:String,
        required:false
    },
    photoOfSeller: {
        type:String,
        required: true
    },
    neighborhoodOfSeller: {
        type:String,
        required:false
    },
    mercadoPagoAccessTokenOfUser: {
        type: String, 
        required: false
    },
    nameOfSeller: {
        type: String,
        required: true
    },
    acceptMercadopago: {
        type: String,
        required: false
    },
    acceptCash: {
        type: String,
        required: false
    },

    image1: {
        type: String,
        required: false
    },
    image2: {
        type:String,
        required: false
    },
    image3: {
        type: String,
        required:false
    },

    image4: {
        type:String,
        required: false
    },
    image5: {
        type: String,
        required:false
    },
    image6:{
        type:String,
        required: false
    }
    
}, {
    
    timestamps:true
})

module.exports = mongoose.model('Product', productSchema)