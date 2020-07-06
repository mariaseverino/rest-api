const bcrypt = require('bcryptjs')
const knex = require('../database/connections')

module.exports = {

    async index(req, res, next){
        const user = await knex('user').select('*')
        return res.json(user)
    },

    async create(req, res, next){
        try{
            const {name, email} = req.body

            const hash = await bcrypt.hash(req.body.password, 10)
            
            await knex('user').insert({
                name,
                email,
                password: hash,
            })
            return res.json('success')
        }
        catch(err){
            return res.send({failed: 'somethig wrong'})
        }
    }
}
bcrypt.js