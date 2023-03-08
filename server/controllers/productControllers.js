const Product = require('../models/productModel')
const uploadUserImage = require('../cloudinary/config')
const fs = require('fs-extra')

// obtener todos los products
const getAllProducts = async (req, res) => {
    const prod = await Product.find({})
    res.status(200).json(prod)
}




const postSomeProduct = async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please add the necessary info')
    }

    const { userId, productName, description, categorie, price, photoOfSeller, nameOfSeller, mercadoPagoAccessTokenOfUser } = req.body
    const paymentMethods = JSON.parse(req.body.paymentMethods)
    const files = req.files;
    let images = {}

    for (const file in files) {
        const newResult = await uploadUserImage(files[file].tempFilePath)
        images["image" + (Object.keys(images).length + 1)] = newResult.secure_url
        fs.remove(files[file].tempFilePath)
    }
    const productToDb = {
        userId,
        productName,
        description,
        categorie,
        price,
        photoOfSeller,
        nameOfSeller,
        mercadoPagoAccessTokenOfUser,
        acceptMercadopago: paymentMethods.mercadoPagoIsChecked,
        acceptCash: paymentMethods.efectivoIsChecked,
        ...images
    }

    try {
        const newProduct = await Product.create(productToDb)
        if (newProduct) {
            res.status(200).json({
                message: "you're prodcut has been added"
            })
            console.log(newProduct)
        }
        else {
            console.log('Error creating product')
        }

    }

    catch (e) {
        console.log(e)
        throw new Error('Error in backend ' +  e)
    }

}


//obtener algún producto por id
const getProductById = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id)
        res.status(200).json(prod)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error, maybe product id doesn't match with a product" })
    }
}

const removeProduct = async (req, res) => {
    const prod = await Product.findById(req.params.id)
    await prod.remove()
}

module.exports = {
    getAllProducts,
    postSomeProduct,
    getProductById,
    removeProduct
}