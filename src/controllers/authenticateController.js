const knex = require('../database/connections')
const bcrypt = require('bcryptjs')


module.exports = {

    async create(req, res){

        const { email, password } = req.body

        const user = await knex('user').where('email', email).select('*').first()
            
        if (!user){
            return res.status(400).send({error: 'User not found'});
        }
            
        if (!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Invalid password'});
        }
        user.password = undefined

        return res.send({user})
    }
}