const EventsDAL = require("../DAL/events.dal")

const eventDAL = new EventsDAL;

const getAllEvents = async () => {
    return eventDAL.getAllEvents();
}

const getEventsById = async (id) => {
    if (id.length < 24) {
        throw new Error('El id no es valido');
    }
    const event = await eventDAL.getEventById(id);
    if (!event) {
        throw new Error('Evento no encontrado')
    }
    return await eventDAL.getEventById(id);
}

const createdEvents = async (body) => {
    const { name, date, assistance, estimate } = body;
    let nameExist = await eventDAL.getEventByName(name);
    if (nameExist) {
        throw new Error('El nombre del evento existe en la base de datos');
    }
    let checkDate = checkDateValidity(date, estimate, assistance);
    if (checkDate) {
        throw new Error(checkDate)
    }
    return await eventDAL.createEvent(body);
}

const updateEvent = async (id, body) => {
    const { date, assistance, estimate } = body;
    if (id.length < 24) {
        throw new Error('El id no es valido');
    }
    const event = await eventDAL.getEventById(id);
    if (!event) {
        throw new Error('Evento no encontrado')
    }
    let checkDate = checkDateValidity(date, estimate, assistance);
    if (checkDate) {
        throw new Error(checkDate)
    }
    await eventDAL.updateEvent(id, body);
}

const deleteEvent = async (id) => {
    if (id.length < 24) {
        throw new Error('El id no es valido');
    }
    const event = await eventDAL.getEventById(id);
    if (!event) {
        throw new Error('Evento no encontrado')
    }
    await eventDAL.deleteEvent(id); 
}

const checkDateValidity = (date, estimate, assistance) => {
    let dateNow = new Date();
    if ((dateNow > new Date(date) && estimate) || (dateNow <= new Date(date) && assistance)) {
        return "La fecha no debe ser " + (estimate ? "inferior " : "superior ") + "a " + formatDate(dateNow)
    }
    return null
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(date);
}

module.exports = {
    getAllEvents,
    getEventsById,
    createdEvents,
    updateEvent,
    deleteEvent
}