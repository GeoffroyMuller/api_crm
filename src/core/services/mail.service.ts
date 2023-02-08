import { createTransport } from "nodemailer";
import { IMailService } from "./types";

const mailService: IMailService = {
    async sendMail(props) {

        const transporter = createTransport({
            host: "apicrm.demoapp.fr",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "bot@apicrm.demoapp.fr",
                pass: "0kot%H049",
            },
            tls: {
			rejectUnauthorized: false,//Laisser à false si vos certificat ne sont pas à jour
        },
        });
        
        return transporter.sendMail(
            {
                from: "bot@apicrm.demoapp.fr",
                to: props.to,
                subject: props.subject,
                html: props.html,
            },
        );
            



    }
}
export default mailService;