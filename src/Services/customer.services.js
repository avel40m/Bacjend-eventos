const CustomerDAL = require("../DAL/customer.dal")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const customerDAL = new CustomerDAL;

const register = async (body) => {
    const customer = await customerDAL.getCustomerByUsername(body.username);
    if (customer) {
        throw new Error('El username existe en la base de datos');
    }
    let passwordHash = hashPassword(body.password)
    return await customerDAL.createCustomer({...body,password: passwordHash});
}

const login = async (body) => {
    const customer = await customerDAL.getCustomerByUsername(body.username);
    if (!customer) {
        throw new Error('El username no existe en la base de datos');
    }
    const isMatch = comparePassword(body.password,customer.password);
    if (!isMatch) {
        throw new Error('El password es incorrecto');
    }
    const token = generateToken(customer);
    return {customer,token};
}

const hashPassword =(password) => {
    return bcrypt.hashSync(password,10);
}

const comparePassword = (password,passwordHash) => {
    return bcrypt.compareSync(password,passwordHash);
}

const generateToken = (customer) => {
    const payload = {
        id: customer._id,
        username: customer.username,
        rol: customer.rol,
    }
    return jwt.sign(payload,"secretkey",{expiresIn: '30m'});
}

module.exports = {
    register,
    login
}