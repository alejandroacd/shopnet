require('dotenv').config();

const productImported = require('./data/localProducts')
const productModel = require('./models/productModel')
const connectDB = require('./dbConfig/db') 

connectDB()

const importData = async (req,res) => {
    try {
        await productModel.deleteMany({})
        await productModel.insertMany(productImported)
        process.exit()
    }
    catch(error){
        console.log(`error del tipo ${error}`)
        process.exit(1)
    }
}

importData()