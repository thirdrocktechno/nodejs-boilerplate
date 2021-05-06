const express = require('express')
const bookCtr = require('./bookController')
const Validate = require('./../../../helper/validate')

const {loadUser} = require('./../../../middleware/userMiddleware')

const {add, list} = require('./bookValidator')

const userRouter = express.Router()

// Routes
userRouter.post('/', Validate(add), loadUser, bookCtr.addBook);
userRouter.get('/', Validate(list), loadUser, bookCtr.list)

module.exports = userRouter
