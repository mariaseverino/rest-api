const bcrypt = require('bcryptjs')
const knex = require('../database/connections')

module.exports = {

    async index(req, res, next){
        const user = await knex('user').select('*')
        return res.json(user)
    },

    async create(req, res, next){

        const {email} = req.body

        try{
            const user = await knex('user').where('email', email)

            if (user.email == email){
                return res.status(400).send({error: 'User already exists'})
            }
            const {name} = req.body

            const hash = await bcrypt.hash(req.body.password, 10)
            
            await knex('user').insert({
                name,
                email,
                password: hash,
            })
            
            return res.json('Success')
        }
        catch(err){
            return res.status(400).send({error: 'Registration failed'})
        }
    }
}