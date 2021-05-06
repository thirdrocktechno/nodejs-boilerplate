const Joi = require('joi')

module.exports = {
    // POST /register
    add: {
        body: {
            title: Joi.string().required().label('Title'),
            description: Joi.string().required().label('Description'),
            isbn: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required().label('ISBN'),
            genre: Joi.string().required().label('Genre'),
            price: Joi.number().greater(1).required().label('Price'),
            totalPages: Joi.number().greater(1).required().label('Total pages'),
            publication: Joi.string().required().label('Publication'),
            publishedAt: Joi.date().required().label('PublishedAt'), 
        },
    },

    //POST /login
    login: {
        body: {
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password'),
        },
    },

    //POST /login
    list: {
        query: {
            page: Joi.number().label('Page'),
            limit: Joi.number().label('Limit'),
        },
    },
}
