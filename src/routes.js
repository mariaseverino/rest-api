const express = require('express')
const routes = express.Router()

const RegisterController = require('./controllers/registerController')
const AuthenticateController = require('./controllers/authenticateController')

routes.get('/register', RegisterController.index)
    .post('/register', RegisterController.create)

routes.post('/authenticate', AuthenticateController.create)

module.exports = routes