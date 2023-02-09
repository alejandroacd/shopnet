const Product = require('../models/productModel')
const uploadUserImage = require('../cloudinary/config')
const fs = require('fs-extra')

// obtener todos los products
const getAllProducts = async (req,res) => {
    const prod = await Product.find({})
    res.status(200).json(prod)
}

//postear algún producto
const postSomeProduct = async (req,res) => {
    if(!req.body) {
        res.status(400)
        throw new Error('Please add the necessary info')
    }

    res.json({message: {...req.body}})
}

//obtener algún producto por id
const getProductById = async (req,res) => {
 try {
    const prod = await Product.findById(req.params.id)
    res.status(200).json(prod)
 }
 catch(error){
     console.log(error)
     res.status(500).json({message:"Server Error, maybe product id doesn't match with a product"})
 }
}

const removeProduct = async (req,res) => {
    const prod = await Product.findById(req.params.id)
    await prod.remove()
}

module.exports = {
    getAllProducts,
    postSomeProduct,
    getProductById,
    removeProduct
}