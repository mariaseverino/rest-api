const bcrypt = require('bcryptjs')
const knex = require('../database/connections')
const crypto = require('crypto')

module.exports = {

    async index(req, res){
        
        const user = await knex('user').select('*')
        return res.send({ user })
    },

    async create(req, res){

        const { name, email, password } = req.body

        try{
            const user = await knex('user')
                .where('email', email)
                .select('*')
                .first()
                
            if (user){
                return res.status(400).send({error: 'User already exists'})
            }

            const hash = await bcrypt.hash(password, 10)
            
            const id = crypto.randomBytes(5).toString('hex');

            await knex('user').insert({
                id,
                name,
                email,
                password: hash,
            })

            return res.send()
        }
        catch(err){
            console.log({ error: err.message })
            return res.status(400).send({ error: 'Registration failed, try again' })
        }
    }
}