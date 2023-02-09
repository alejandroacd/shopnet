const { config } = require('dotenv')
config()

const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

/* función que sube imágen a Cloudinary, donde filePath es la ruta
   de la imagen que queremos subir.  
*/
const uploadUserImage = async (filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder:'userImages'
    })
}


module.exports = uploadUserImage