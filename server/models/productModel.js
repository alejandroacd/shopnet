const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    creatorId: {
      type: "String",
      required: false
    },
    name:{
        type: "String",
        required:true
    },
    description: {
        type:"String",
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
    imgUrl1: {
        type: "String",
        required: true
    },
    imgUrl2: {
        type:"String",
        required: false
    },
    imgUrl3: {
        type:"String",
        required: false
    }
}, {
    
    timestamps:true
})

module.exports = mongoose.model('Product', productSchema)