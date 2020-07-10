const bcrypt = require('bcryptjs')
const knex = require('../database/connections')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')


module.exports = {

    async index(req, res){
        
        const user = await knex('user').select('*').first()
        
        user.password = undefined

        const token = jwt.sign({id: user.id}, authConfig.secret, {
            expiresIn: 86400
        })
        return res.send({user, token})
    },

    async create(req, res){

        const {name, email, password} = req.body

        try{

            const user = await knex('user').where('email', email).select('*').first()
                
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

            return res.json('Success')
        }
        catch(err){
            return res.status(400).send({error: 'Registration failed'})
        }
    }
}