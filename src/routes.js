const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/userController')

routes.get('/', UserController.index)
    .post('/auth/register', UserController.create)

module.exports = routes