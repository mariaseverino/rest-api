const bcrypt = require('bcryptjs')
const knex = require('../database/connections')

module.exports = {

    async index(req, res){
        const user = await knex('user').select('*')
        return res.json(user)
    },

    async create(req, res){

        const {name, email, password} = req.body

        try{

            const user = await knex('user').where('email', email).select('*').first()
                
            if (user){
                return res.status(400).send({error: 'User already exists'})
            }

            const hash = await bcrypt.hash(password, 10)
                
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