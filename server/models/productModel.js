const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    description: {
        type:String,
        required: true
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