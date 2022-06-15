require('dotenv').config();
const mongoose = require('mongoose');

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    console.log('Conexion a base de datos con éxito :)')
    }

    catch(e) {
        console.log(`Ha ocurrido un error en la conexión del tipo: ${e}`)
        process.exit(1)
    }
}

module.exports = DbConnection