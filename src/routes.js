const express = require('express')
const routes = express.Router()

const authMiddleware = require('../src/middlewares/auth')

const RegisterController = require('./controllers/registerController')
const AuthenticateController = require('./controllers/authenticateController')

//routes.use(authMiddleware)

routes.get('/register', RegisterController.index)
    .post('/register', RegisterController.create)

routes.post('/authenticate', AuthenticateController.create)
    .use(authMiddleware).get('/projects', AuthenticateController.index)

module.exports = routes