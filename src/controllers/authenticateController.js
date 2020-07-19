const knex = require('../database/connections')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = {

    async index(req, res){
        res.send({ ok: true, user: req.userId })
    },

    async create(req, res){

        const { email, password } = req.body

        try{

            const user = await knex('user')
                .where('email', email)
                .select('*')
                .first()
                
            if (!user){
                return res.status(400).send({ error: 'User not found' })
            }
                
            if (!await bcrypt.compare(password, user.password)){
                return res.status(400).send({ error: 'Invalid password' })
            }

            user.password = undefined

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400
            })

            return res.send({ user, token })
        }
        catch(err){
            res.status(400).send({ error: err.message })
        }
    }
}