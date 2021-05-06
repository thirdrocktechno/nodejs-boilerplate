const express = require('express');
const deviceCtr = require('./deviceController.js');
const Validate = require('./../../../helper/validate');
const {create} = require('./deviceValidator')

const deviceRouter = express.Router();

// Routes
deviceRouter.post('/create', Validate(create), deviceCtr.create);

module.exports = deviceRouter;

