const EventsService = require("../Services/events.services.js");

const eventsService = new EventsService;

const getAllEvents = async (req,res) => {
    try {
        const events = await eventsService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}

const getEventById = async (req,res) => {
    try {
        let id = req.params.id;
        const event = await eventsService.getEventById(id);
        if (event == null || event.length == 0) {
            return res.status(404).json({message: "Evento no encontrado"});
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createdEvents = async (req,res) => {
    try {
        const { name,date,assistance,estimate } = req.body;
        let eventExist = await eventsService.getEventByName(name);
        if (eventExist) {
            return res.status(404).json({message: "El nombre está repetido en la base de datos"})
        }
        const checkDate = checkDateValidity(date,estimate,assistance);
        if (checkDate) {
            return res.status(404).json({message:checkDate})
        }
        let eventSaved = await eventsService.createEvent(req.body);
        return res.status(200).json(eventSaved);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateEvent = async (req,res) => {
    try {
        let id = req.params.id;
        let { date,estimate,assistance } = req.body;
        const searchEventById = await eventsService.getEventById(id);
        if (searchEventById == null || searchEventById.length == 0) {
            return res.status(404).json({message: "Evento no encontrado"});
        }
        const checkDate = checkDateValidity(date,estimate,assistance);
        if (checkDate) {
            return res.status(404).json(checkDate);
        }
        await eventsService.updateEvent(id,req.body);     
        res.sendStatus(204);   
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteEvent = async (req,res) => {
    try {
        let id = req.params.id;
        let event = await eventsService.getEventById(id);
        if (event == null || event.length == 0) {
            return res.status(404).json({message: "Evento no encontrado"});
        }
        await eventsService.deleteEvent(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const checkDateValidity = (date,estimate,assistance) => {
    let dateNow = new Date();
    if ((dateNow > new Date(date) && estimate) || (dateNow <= new Date(date) && assistance)) {
        return "La fecha no debe ser " + (estimate ? "inferior " : "superior ") + "a " + formatDate(dateNow) 
    }
    return null
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-AR',{dateStyle: 'medium'}).format(date);
}

module.exports = {
    getAllEvents,       
    getEventById,
    createdEvents,
    deleteEvent,
    updateEvent
}