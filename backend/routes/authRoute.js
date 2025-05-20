const express = require('express');   // its like an mini server
const {register, login, logout} = require('../controller/auth.controller');

const router = express.Router();

router.post("/register", register);    // api calling for registration by user 
router.post("/login", login);   // api calling for login by user 
router.post("/logout", logout);  // // api calling for logout by by user 


module.exports = router;