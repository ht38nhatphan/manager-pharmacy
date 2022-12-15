var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const authController = require('../app/controllers/AuthController');
const middlwareController = require('../app/controllers/MiddlewareController')

//@router POST /auth/register
//@desc Register user
//@access Public
router.post('/register', authController.registerUser);

//@router POST /auth/Login
router.post('/login' ,authController.loginUser);

//@router POST /auth/Login
router.post('/loginAdmin' ,authController.loginAdmin);

//@router REFRESH Token
router.post('/refresh', authController.requestRefreshToken);

//@router Logout
router.post('/logout', middlwareController.verifyToken, authController.userLogout);


module.exports = router;