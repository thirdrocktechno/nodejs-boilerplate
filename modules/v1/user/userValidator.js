const Joi = require('joi')

module.exports = {
    // POST /register
    register: {
        body: {
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password'),
            fullName: Joi.string().required().label('Name'),
        },
    },

    //POST /login
    login: {
        body: {
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password'),
            deviceId: Joi.string().required().label('deviceId')
        },
    },
}
