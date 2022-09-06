const nodemailer = require("nodemailer");
var cron = require('node-cron');


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
        cron.schedule ('50 16 6 9 2', async () => {
        
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
        console.log('running a task every minute');
    });
    }
    catch(error) {
        console.log("Email not send")
        console.log(error)
    }
}



bookingConfirm =  async (email,subject,title,infoLoding ,infoBooking) => {
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
            <h4>Información de tu reserva</h4>
            <ul>
                <li>Código de Reserva: ${infoBooking.code}</li>
                <li> Alojamiento: ${infoLoding.title}
                <li>Check In:  ${new Date(infoBooking.checkIn).toLocaleDateString()}</li>
                <li>Check out:  ${new Date(infoBooking.checkOut).toLocaleDateString()}</li>
                <li> País: ${infoLoding.country}</li>
                <li> Ciudad: ${infoLoding.city}</li>
                <li> Dirección:  ${infoLoding.address}</li>
                <li>Noche: ${infoBooking.night}</li>
                <li>Precio Noche: ${infoBooking.costNight}</li>
                <li>Precio Total: ${infoBooking.totalPrice}</li>
                <li>Huéspedes: ${infoBooking.guests}</li>
            </ul>
            <p>¡Gracias por tu reserva! ¡Que la disfrutes!</p>
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
    verifyEmail,
    bookingConfirm
}
