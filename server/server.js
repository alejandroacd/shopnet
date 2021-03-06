const express = require('express')
const port = 3001;
const cors = require('cors')
const app = express();
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const DbConnection = require('./dbConfig/db');
const path = require('path')
const fileUpload = require('express-fileupload');


DbConnection();

//middlewares 
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    tempFileDir:"./uploads",
    useTempFiles:true

}))


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//Mercadopago get code route 



app.listen(process.env.PORT || port, () => {
    console.log(`Listening at port ${port}`)
})