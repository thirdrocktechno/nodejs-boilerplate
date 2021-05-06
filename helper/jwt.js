const jwt = require('jwt-simple');
const logger = require('../helper/logger')

const jwtUtil = {}

jwtUtil.getAuthToken = (data) => {
    return jwt.encode(data, process.env.JWT_SECRET)
}

jwtUtil.decodeAuthToken = (token) => {
    if (token) {
        try {
            return jwt.decode(token, process.env.JWT_SECRET)
        } catch (err) {
            logger.debug('Token Verification issue', token)
            logger.error(err)
            return false
        }
    }
    return false
}

module.exports = jwtUtil
