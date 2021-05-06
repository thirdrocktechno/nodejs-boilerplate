const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const sendEmail = {}
// const { GoogleToken } = require('gtoken');
// const {private_key,client_id} = require(process.env.EMAIL_CREDENTIAL_PATH)

sendEmail.sendMail = async function sendMail(to, template, payload) {
    console.log(sendEmail)
    const templatesDir = path.resolve(`${__dirname}/../`, 'templates')
    const content = `${templatesDir}/${template}.html`
    const html = sendEmail.getHtmlContent(content, payload)
    // const transporter = nodemailer.createTransport({

    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   secure: true,
    //   auth: {
    //     type:'OAuth2',
    //     user: process.env.EMAIL_CLIENT_USER, // replace with your Mailtrap credentials
    //     serviceClient:client_id,
    //     privateKey: private_key
    //   }
    //   });

    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        // auth: {
        //   user: 'sample@gmail.com',
        //   pass: 'Your password' // naturally, replace both with your real credentials or an application-specific password
        // }
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME, // replace with your Mailtrap credentials
            pass: process.env.EMAIL_PASSWORD,
        },
        debug: true, // show debug output
        logger: true, // log information in console
    })

    console.log('transporter' + transporter)

    const mailOptions = {
        from: process.env.EMAIL_CLIENT_USER,
        to: to,
        subject: to,
        html,
    }
    console.log('mailOptions' + mailOptions)

    await transporter.verify()
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent to: ${mailOptions.to}`)
        }
    })
}

sendEmail.getHtmlContent = function getHtmlContent(filePath, replaceData) {
    try {
        const data = fs.readFileSync(filePath)
        let html = data.toString()
        Object.keys(replaceData).forEach((key) => {
            html = html.replace(key, replaceData[key])
        })

        return html
    } catch (error) {
        return error
    }
}

module.exports = sendEmail
