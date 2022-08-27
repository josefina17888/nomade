const nodemailer = require("nodemailer")



verifyEmail =  async (email,subject,title,msg,url) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }

        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">${title}</h2>
            <p>${msg}</p>
            <a href=${url} style="background: #069A8E; text-decoration: none; border-radius: 5px;
            border: 1px solid rgb(0, 0, 0); color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Este soy yo</a>
            <p>Si el boton no funciona da click al enlace de abajo</p>
            <div>${url}</div>
            </div>
        `
        })
        console.log("Email sent Sucess")
    }
    catch(error) {
        console.log("Email not send")
        console.log(error)
    }
}

module.exports = {
    verifyEmail
}