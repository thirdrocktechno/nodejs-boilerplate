const joi = require('joi')
const httpStatus = require('http-status')

const Pick = require('./pick')
const ApiError = require('./ApiError')

const validate = (schema) => (req, res, next) => {
    const validSchema = Pick(schema, ['params', 'query', 'body', 'headers'])
    const object = Pick(req, Object.keys(validSchema))
    const {value, error} = joi
        .compile(validSchema)
        .prefs({errors: {label: 'key'}})
        .validate(object)

    if (error) {
        const errorMessage = error.details.map((details) => details.message.replace(/"/g, '')).join(', ')
        // return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        return res.status(httpStatus.BAD_REQUEST).json({error: errorMessage})
    }
    Object.assign(req, value)
    return next()
}

module.exports = validate
