const constants = require('../../../config/constants');
const Joi = require('joi')

module.exports = {
    // POST /register
    create: {
        body: {
            deviceType: Joi.string().valid(...constants.DEVICE.TYPES).required().label('Device Type'),
            appIdentifier: Joi.string().required().label('App identifier'),
            appVersion: Joi.string().required().label('App Version'),
            deviceToken: Joi.string().required().label('Device Token'),
            browserInfo: Joi.string().required().label('Browser info')
        },
    }
}
