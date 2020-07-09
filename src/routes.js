const express = require('express')
const routes = express.Router()

const RegisterController = require('./controllers/registerController')

routes.get('/auth/register', RegisterController.index)
    .post('/auth/register', RegisterController.create)

module.exports = routes