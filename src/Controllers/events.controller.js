const EventsService = require('../Services/events.services');

const getAllEvents = async (req, res) => {
    try {
        const events = await EventsService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getEventById = async (req, res) => {
    try {        let id = req.params.id;
        const event = await EventsService.getEventsById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createdEvents = async (req, res) => {
    try {
        const body = req.body;
        const event = await EventsService.createdEvents(body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateEvent = async (req, res) => {
    try {
        let id = req.params.id;
        const body = req.body;
        await EventsService.updateEvent(id, body);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteEvent = async (req,res) => {
    try {
        let id = req.params.id;
        await EventsService.deleteEvent(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createdEvents,
    updateEvent,
    deleteEvent
}