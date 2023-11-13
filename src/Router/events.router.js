const express = require('express');
const { getAllEvents, getEventById, createdEvents, updateEvent, deleteEvent } = require('../Controllers/events.controller');
const router = express.Router();

router.get('/events', getAllEvents);

router.get('/events/:id', getEventById);

router.post('/events',createdEvents);

router.put('/events/:id',updateEvent);

router.delete('/events/:id',deleteEvent);

module.exports = router;