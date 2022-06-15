const express = require('express');
const router = express.Router();
const  {getAllProducts,getProductById, removeProduct, postSomeProduct, } = require('../controllers/productControllers')

//get all products 
router.get('/', getAllProducts)

// get a product by id

router.get('/:id',getProductById)

//delete product
router.delete('/:id', removeProduct)

//post a product
router.post('/', postSomeProduct)

module.exports = router