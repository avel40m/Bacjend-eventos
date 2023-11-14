const express = require('express');
const { validateDataRegister,validateDataLogin } = require('../Middleware/customer.middleware');
const { register, login } = require('../Controllers/customer.controller');
const passport = require('passport');
const router = express.Router();

router.post('/register',validateDataRegister,register);

router.post('/login',validateDataLogin,login);

router.get('/protected', passport.authenticate('jwt', {session:false}), (req,res) => {
    res.status(200).json("ok")
});

module.exports = router;
