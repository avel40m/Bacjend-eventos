const Events = require("../Models/Events.js");

class EventsService {
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
        const event = new Events(body);
        await event.save();
        return event;
    }
    async updateEvent(id,body){
        await Events.findOneAndUpdate({_id: id},body)
    }
    async deleteEvent(id){
        await Events.findByIdAndDelete(id);
    }
}

module.exports = EventsService;