const Joi = require("joi");

const createdJoiEvents = Joi.object({
    name: Joi.string().valid(),
    category: Joi.string().valid('Food','Museum','Concert','Race','Books','Cinema','Party').required(),
    date: Joi.string().valid(),
    image: Joi.string().valid(),
    place: Joi.string().valid(),
    price: Joi.string().valid(),
    capacity: Joi.string().valid(),
    assistance: Joi.string(),
    estimate: Joi.string(),
    description: Joi.string().valid(),
})

const validateCreateEvents = (req,res,next) => {
    const { error } = createdJoiEvents.validate(req.body);
    if (error) {
        return res.status(404).json({error: error.details[0].message});
    }
    next();
}

module.exports = {
    validateCreateEvents
}