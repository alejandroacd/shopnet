const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const fs = require('fs-extra')
const uploadUserImage = require('../cloudinary/config')


// register 
const registerUser = async (req, res) => {
    console.log(req.body)
    const { name, lastName, email, password } = req.body

    if (!name || !lastName || !email || !password) {
        res.status(400).json({
            message:' Rellená todos los campos'
        })
        throw new Error('please add all fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).send({
            message:'Usuario existente'
        })
        throw new Error('User already exists')
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user

    const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        userImage: false,
        phoneNumber: null,
        neighborhood: null,
        mercadopagoAccessToken: null,
        mercadopagoRefreshToken: null
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
            image: user.imageUrl
        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }
}


// login 
const loginUser = async (req, res) => {

    const { email, password } = req.body

    // check for email of user 
    const user = await User.findOne({ email })
    
    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
            isLoggedIn: true,
        })
    } else {
        res.status(400).send({
            message:'User and password does not match'
        })

   
    }    
}


// Subir avatar de perfil
const uploadImage = async (req, res) => {

    try {
        const result = await uploadUserImage(req.files.image.tempFilePath)
        await fs.remove(req.files.image.tempFilePath);
        console.log(req.params.id)
        const updatedPost = await User.findByIdAndUpdate(req.params.id, {
            userImage: result.secure_url
        }, {
            new: true
        })
        res.json(updatedPost)
        console.log(updatedPost)
    }
    catch (e) {
        console.log(e)
    }
}



// Obtener usuario logueado
const getMyUser = async (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (e) {
        res.send(e)
    }
}

const updateTokens = async (req,res) => {
    const {access_token, refresh_token, id} = req.body;

    console.log(access_token,refresh_token)

    try {
        const updated = await User.findByIdAndUpdate(id, {
            mercadopagoAccessToken: access_token,
            mercadopagoRefreshToken: refresh_token
        })
        console.log(updated)
    }
    catch(e){
        console.log(e)
    } }

const updateProfile = async (req,res) => {
    const { identificador, neighborhood, phoneNumber } = req.body;
    console.log(req.body)

    try {
       const updated = await User.findByIdAndUpdate(identificador, {
        neighborhood,
        phoneNumber
       })
    }

    catch(e){
        res.status(400)
        throw new Error('Error upadting your profile')
    }
}



const deleteAccessToken = async (req,res) => {
    const { id } = req.body;
    try {
        const updated = await User.findByIdAndUpdate(id, {
            mercadopagoAccessToken: null,
            mercadopagoRefreshToken: null
        })
        console.log(updated)
    }
    catch(e){
        res.status(400)
        throw new Error('Error deleting your MercadoPago association')
    }
}

// Función que genera token (JWT)

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {   
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMyUser,
    uploadImage,
    updateTokens,
    updateProfile,
    deleteAccessToken,
    generateToken
} 