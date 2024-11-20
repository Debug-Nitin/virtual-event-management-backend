const joi = require('joi');

const eventSchema = joi.object({
    id: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    date: joi.date().required(),
    time: joi.string().required(),
    organizerId: joi.string().required(),
    participants: joi.array().items(joi.string()).required()
});

class eventModelDTO {
    constructor(event){
        const {error, value} = eventSchema.validate(event);
        if(error){
            throw new BadRequestError(error.message);
        }
        this.id = value.id;
        this.title = value.title;
        this.description = value.description;
        this.date = value.date;
        this.time = value.time;
        this.organizerId = value.organizerId;
        this.participants = value.participants;
    }
}

module.exports = eventModelDTO;