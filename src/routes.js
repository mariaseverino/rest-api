const express = require('express')
const routes = express.Router()

const authMiddleware = require('../src/middlewares/auth')

const RegisterController = require('./controllers/registerController')
const AuthenticateController = require('./controllers/authenticateController')
const ForgotPasswordController = require('./controllers/forgotPasswordController')

//routes.use(authMiddleware)

routes.get('/register', RegisterController.index)
    .post('/register', RegisterController.create)

routes.put('/forgot_password', ForgotPasswordController.update)

routes.post('/authenticate', AuthenticateController.create)
    .use(authMiddleware).get('/projects', AuthenticateController.index)



module.exports = routes