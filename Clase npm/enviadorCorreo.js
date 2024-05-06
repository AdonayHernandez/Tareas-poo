const nodemailer = require('nodemailer');

class GestorCorreo {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'esdrown23@gmail.com',
                pass: 'Polaco_23'
            }
        });
    }

    enviarCorreo(destinatario, asunto, cuerpo) {
        const mailOptions = {
            from: 'esdrown23@gmail.com',
            to: 'rock43301@gmail.com',
            subject: 'Pude Ing.',
            text: 'Ya tengo mi tarea lista para subir'
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });
    }
}

// Enviar el correo
const gestorCorreo = new GestorCorreo();
gestorCorreo.enviarCorreo('rock43301@gmail.com', 'Pude Ing.', 'Ya tengo mi tarea lista para subir');
