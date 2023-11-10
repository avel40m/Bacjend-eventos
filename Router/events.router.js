import express from 'express';
import { createdEvents, deleteEvent, getAllEvents, getEventById, updateEvent } from '../Controllers/events.controller.js';
const router = express.Router();

router.get('/events', getAllEvents);

router.get('/events/:id', getEventById);

router.post('/events',createdEvents);

router.put('/events/:id',updateEvent);

router.delete('/events/:id',deleteEvent);

export default router