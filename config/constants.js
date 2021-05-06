const Enum = require('enum')

module.exports = {
    PAGER: {
        LIMIT: 10,
        PAGE: 0,
    },
    CODE: {
        SUCCESS: 200,
        CREATED: 201,
        ERROR: {
            INTERNAL_SERVER_ERROR: 500,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
        },
    },
    COUNTRY_CODES: {
        COUNTRY_CODE: ['IN', 'GB'],
    },
    AVAILABLE_LOCALS: ['en'],

    EMAIL_SUBJECTS: {
        VERIFICATION_EMAIL: 'Email verification',
        RECOVER_PASSWORD: 'Recover password',
        PASSWORD_CHANGED: 'Password changed',
    },

    EMAIL_TEMPLATES: {
        FORGOT_PASSWORD: 'forgotPassword',
        REGISTER: 'register',
        PASSWORD_CHANGED: 'passwordChanged',
    },
    DEVICE: {
        TYPES: ['ios', 'android', 'web'],
    },
}
