const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMyUser, uploadImage, updateTokens, deleteAccessToken } = require('../controllers/userControllers')
const protect = require('../middlewares/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMyUser)

router.post('/me/:id', uploadImage)

router.post('/postAccessToken', updateTokens)

router.post('/deleteAccessToken', deleteAccessToken)

router.post('/updateProfile', updateProfile)


 

module.exports = router