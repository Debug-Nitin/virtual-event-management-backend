const joi = require('joi');
const {BadRequestError} = require('../../Utils/Errors/user_error');

const userSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.array().items(joi.string()),
    registeredEvents: joi.array().items(joi.string()),
    dateCreated: joi.date()
});

class UserModelDTO {
    constructor(user){
        const {error, value} = userSchema.validate(user);
        if(error){
            throw new BadRequestError(error.message);
        }
        this.id = value.id;
        this.name = value.name;
        this.email = value.email;
        this.password = value.password;
        this.role = value.role || [];
        this.registeredEvents = value.registeredEvents || [];
        this.dateCreated = value.dateCreated;
    }
}

module.exports = UserModelDTO;