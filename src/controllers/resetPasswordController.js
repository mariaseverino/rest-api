const knex = require('../database/connections')
const bcrypt = require('bcryptjs')

module.exports = {

    async create(req, res){

        const { email, token, password } = req.body

        try{
            const user = await knex('user').where('email', email).select('*').first()

            if (!user){
                return res.status(400).send({ error: 'User not found' })
            }

            if (user.passwordResetToken != token){
                return res.status(400).send({ error: 'Token invalid' })
            }

            const now = new Date()
            console.log(now)
            if (now > user.passwordResetExpires){
                return res.status(400).send({ error: 'Token expired' })
            }
            
            const hash = await bcrypt.hash(password, 10)
            
            await knex('user').where('email', email).update({ password: hash })

            return res.send()
        }
        catch(err){
            console.log({ error: err.message })
            return res.status(400).send({ error: 'Cannot reset password, try again' })
        }
    }
}