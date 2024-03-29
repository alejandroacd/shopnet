const nodemailer = require('nodemailer')


const transporter = async (email,subject,text)  => {
    try {
       const transporterData = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await transporterData.sendMail({
            from: process.env.USER,
            to:email,
            subject:subject,
            text:text
        })
    }
    catch (e){
        console.log('email not snet')
        console.log(e)
        return e
    }
}


module.exports = transporter