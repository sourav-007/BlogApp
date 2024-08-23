const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController.js');
const  { verifytJWT }  = require('../middleware/auth.js');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifytJWT, logoutUser);




module.exports = router