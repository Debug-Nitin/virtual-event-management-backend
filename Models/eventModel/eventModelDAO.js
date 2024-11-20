const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../' ,'events.json');

const events = [];

const loadEvents = async () => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        let parsedData = JSON.parse(data).users;
        users.length = 0;
        users.push(...parsedData);
    } catch (err) {
        console.log('Error reading file:', err);
    }
};

const saveEvents = async () => {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify({events},null,2), 'utf8');
    }catch(err) {
        console.log('Error writing file:', err);
    }
}

const findOne = async(query) => {
    await loadEvents();
    return events.find(event => event.id === query.id);
}

const createEvent = async(eventDTO) => {
    await loadEvents();
    //converting the class instance into a plain object
    const eventObject = Object.assign({}, eventDTO);
    events.push(eventObject);
    console.log(events);
    await saveEvents();
    return eventDTO;
}

const getEvents = async() => {
    await loadEvents();
    return events;
}

const updateEvent = async(event) => {
    await loadEvents();
    const index = events.findIndex(e => e.id === event.id);
    events[index] = event;
    await saveEvents();
    return event;
}

const deleteEvent = async(id) => {
    await loadEvents();
    const index = events.findIndex(e => e.id === id);
    events.splice(index, 1);
    await saveEvents();
}

const registerEvent = async(eventId, userId) => {
    await loadEvents();
    const event = events.find(e => e.id === eventId);
    if(event) {
        event.registeredUsers.push(userId);
        await saveEvents();
        return event;
    }
    throw new Error('Event not found');
}

module.exports = {
    findOne,
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    registerEvent
};
