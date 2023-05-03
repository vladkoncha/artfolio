import {Transporter} from "nodemailer";

const nodemailer = require('nodemailer');

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation link for ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <a href="${link}"><h1>Activate account</h1></a>
                </div>
            `
        });
    }

}

export default new MailService();