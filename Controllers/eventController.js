const eventModel = require('../Models/eventModel/eventModelDTO');
const jwt = require('jsonwebtoken');
const eventServices = require('../Services/eventServices');

const createEvent = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
        const userId = decodedToken.id;

        const newEvent = new eventModel({
            ...req.body,
            organiser: userId
        });

        const savedEvent = await eventServices.savedEvent(newEvent);
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
        const userId = decodedToken.id;

        const events = await eventServices.getEvents(userId);
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEvent = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
        const userId = decodedToken.id;

        const eventId = req.params.id;
        const updatedEvent = req.body;

        const event = await eventServices.updateEvent(eventId,userId,updatedEvent);
        res.status(200).json(event);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

const deleteEvent = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
        const userId = decodedToken.id;

        const eventId = req.params.id;

        const event = await eventServices.deleteEvent(eventId,userId);
        res.status(200).json(event);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

const registerEvent = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
        const userId = decodedToken.id;

        const eventId = req.params.id;

        const event = await eventServices.registerEvent(eventId,userId);
        res.status(200).json(event);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    registerEvent
};
