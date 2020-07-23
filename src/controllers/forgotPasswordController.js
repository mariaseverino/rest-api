const knex = require('../database/connections')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

module.exports = {

    async update(req, res){
        
        const { email } = req.body

        try{
            const user = await knex('user').where('email', email).select('id').first()
                
            if (!user){
                return res.status(400).send({ error: 'User not found' })
            }

            const token = crypto.randomBytes(10).toString('hex')

            const now = new Date()

            now.setHours(now.getHours() + 1)
            
            await knex('user').where('email', email).update({
                passwordResetToken: token,
                passwordResetExpires: now
            })

            console.log(token, now)
            const testAccount = await nodemailer.createTestAccount();

            const transporter = await nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                }
            })

            const info = await transporter.sendMail({
                from: 'fake@example.com',
                to: email,
                subject: 'Reset your password?',
                text: `Reset your password? No problem, use this token ${token}`  
            })

            console.log("Message sent: %s", info.messageId)
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

            return res.send()
        }
        catch(err){
            console.log({ error: err.message })
            return res.status(400).send({error: 'Error on forgot password, try again'})
        }
    }
}