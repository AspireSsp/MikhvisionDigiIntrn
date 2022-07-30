const express = require('express');
const { registerUser, loginUser, logout } = require("../controller/userController");
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout" ,isAuthenticated).get(logout);


module.exports = router; 