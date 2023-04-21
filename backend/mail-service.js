const nodemailer = require('nodemailer');
const MyError = new Error('Could not connect to');

class MailService {

    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'vladimirdrozdov83935@gmail.com',
                pass: 'jjwvygzozqywknhb'
            }
        })
    }

    async send(message,to) {
        try {
            this.transporter.sendMail({
                from: 'vladimirdrozdov83935@gmail.com',
                to,
                subject: 'Activate account',
                text: '',
                html: 
                    `<h1>Follow the link to activate your account</h1>
                    <a href=${message}>${message}</a>`
            });
        } catch (e) {
            throw Error('Failed to send message');
        }
        
    }
}

module.exports = MailService;
