const Customer = require("../Models/Customer.js");

class CustomerDAL {
    async getCustomerByUsername(username){
        return await Customer.findOne({username})
    }
    async createCustomer(body){
        return new Customer(body).save();
    }
}

module.exports = CustomerDAL;