const express = require('express');
const { getAllEvents, getEventById, createdEvents, updateEvent, deleteEvent } = require('../Controllers/events.controller');
const passport = require('passport');
const router = express.Router();

router.get('/events', getAllEvents);

router.get('/events/:id', getEventById);

router.post('/events',passport.authenticate('jwt',{session: false}),createdEvents);

router.put('/events/:id',passport.authenticate('jwt',{session: false}),updateEvent);

router.delete('/events/:id',passport.authenticate('jwt',{session: false}),deleteEvent);

module.exports = router;