const knex = require('knex')
const configuration = require('../../knexfile')

const coneection = knex(configuration.development)

module.exports = coneection