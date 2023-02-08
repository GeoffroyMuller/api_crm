import { createTransport } from "nodemailer";
import { IMailService } from "./types";

const mailService: IMailService = {
    async sendMail(props) {

        const transporter = createTransport({
            host: "smtp.demoapp.fr",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "bot@apicrm.demoapp.fr",
                pass: "0kot%H049",
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