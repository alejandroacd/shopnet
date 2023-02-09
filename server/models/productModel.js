const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    creatorId: {
      type: String,
      required: false
    },
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
    categoria: {
        type:String,
        required:false
    },
    image1: {
        type: String,
        required: false
    },
    image2: {
        type:String,
        required: false
    },
    image2: {
        type:String,
        required: false
    },
    image4: {
        type: String,
        required:false
    },
    image5:{
        type:String,
        required: false
    }
    
}, {
    
    timestamps:true
})

module.exports = mongoose.model('Product', productSchema)