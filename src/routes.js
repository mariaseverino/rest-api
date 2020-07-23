const express = require('express')
const routes = express.Router()

const authMiddleware = require('../src/middlewares/auth')

const RegisterController = require('./controllers/registerController')
const AuthenticateController = require('./controllers/authenticateController')
const ForgotPasswordController = require('./controllers/forgotPasswordController')
const ResetPasswordController = require('./controllers/resetPasswordController')

routes.get('/register', RegisterController.index)
    .post('/register', RegisterController.create)

routes.put('/forgot_password', ForgotPasswordController.update)

routes.put('/reset_password', ResetPasswordController.create)

routes.post('/authenticate', AuthenticateController.create)
    .use(authMiddleware).get('/projects', AuthenticateController.index)

module.exports = routes