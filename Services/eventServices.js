const {sendEmail} = require('../Services/emailService');
const eventModelDAO = require('../Models/eventModel/eventModelDAO');

const createEvent = async (req, res) => {
    try {
        const event = await eventModelDAO.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await eventModelDAO.getEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateEvent = async (req, res) => {
    try {
        const event = await eventModelDAO.updateEvent(req.params.id, req.body);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteEvent = async (req, res) => {
    try {
        await eventModelDAO.deleteEvent(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const registerEvent = async (req, res) => {
    try {
        const event = await eventModelDAO.registerEvent(req.params.id, req.body.userId);
        await sendEmail(req.body.userId, 'Event Registration', `You have successfully registered for the event with ID: ${req.params.id}`);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    registerEvent
};