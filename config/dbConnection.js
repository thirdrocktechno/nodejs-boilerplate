// const mongoose = require('mongoose');
const logger = require('./../helper/logger');
const mongoose = require('mongoose')

module.exports = async () => {
    const options = {
        keepAlive: 1,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }

    // connect to database.
    await mongoose.connect(process.env.MONGODB_URL, options)
    logger.info(`Connected to ${process.env.MONGODB_URL}`)
}
