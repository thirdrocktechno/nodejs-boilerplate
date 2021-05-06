const express = require('express')
const userCtr = require('./userController')
const Validate = require('./../../../helper/validate')

const rateLimit = require('express-rate-limit')

const createAccountLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many accounts created from this IP, please try again after an hour',
})

const {register, login} = require('./userValidator')

const userRouter = express.Router()
// Routes

userRouter.post('/register', Validate(register), createAccountLimiter, userCtr.register);
userRouter.post('/login', Validate(login), userCtr.login)

module.exports = userRouter
