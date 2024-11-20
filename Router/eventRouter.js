const express = require('express');
const router = express.Router();
const {createEvent, getEvents, updateEvent, deleteEvent,registerEvent} = require('../Controllers/eventController');

router.post('/events',createEvent);
router.get('/events',getEvents);
router.put('/events/:id',updateEvent);
router.delete('/events/:id',deleteEvent);
router.post('/events/:id/register',registerEvent);

module.exports = router;
