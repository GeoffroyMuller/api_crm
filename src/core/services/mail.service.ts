import { createTransport } from "nodemailer";
import { IMailService } from "./types";

const mailService: IMailService = {
    async sendMail(props) {
        const transporter = createTransport();
        
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