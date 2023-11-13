const Events = require("../Models/Events.js");

class EventsDAL {
    async getEventById(id){
        return await Events.findById(id);
    }
    async getAllEvents(){
        return await Events.find();
    }
    async getEventByName(name){
        return await Events.findOne({name});
    }
    async createEvent(body){
        return new Events(body).save();
    }
    async updateEvent(id,body){
        await Events.findOneAndUpdate({_id: id},body)
    }
    async deleteEvent(id){
        await Events.findByIdAndDelete(id);
    }
}

module.exports = EventsDAL;