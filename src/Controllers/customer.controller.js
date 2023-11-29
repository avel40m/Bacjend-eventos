const customerService = require('../Services/customer.services');

const register = async (req,res) => {
    try {
        await customerService.register(req.body)
        res.status(201);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const login = async (req,res) => {
    try {
        const {customer,token} = await customerService.login(req.body);
        res.status(200).json({customer,token: 'Bearer ' + token})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    register,
    login
}