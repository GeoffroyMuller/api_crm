import { createTransport } from "nodemailer";
import { IMailService } from "./types";

const mailService: IMailService = {
    async sendMail(props) {
        console.log("send_mail", props);
        // create reusable transporter object using the default SMTP transport
        const transporter = createTransport({
            host: "localhost",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "bot@apicrm.demoapp.fr",
                pass: "0kot%H049",
            },
        });
        
        return transporter.sendMail(
            {
                from: " ",
                to: props.to,
                subject: props.subject,
                html: props.html,
            },
        );
            



    }
}
export default mailService;