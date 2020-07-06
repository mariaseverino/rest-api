const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/authController')

routes.get('/auth/register', UserController.index)
    .post('/auth/register', UserController.create)

module.exports = routes