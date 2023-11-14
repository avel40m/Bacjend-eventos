const Joi = require('joi');

const customerForRegister = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,15}$')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    rol: Joi.string().valid('ADMIN','USER').required()
})

const customerForLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,15}$')).required(),
})

const validateDataRegister = (req,res,next) => {
    const { error } = customerForRegister.validate(req.body);
    if (error) {
        return res.status(404).json({error: error.details[0].message});
    }
    next();
}

const validateDataLogin = (req,res,next) => {
    const { error } = customerForLogin.validate(req.body);
    if (error) {
        return res.status(404).json({error: error.details[0].message});
    }
    next();
}

module.exports = {
    validateDataRegister,
    validateDataLogin
}