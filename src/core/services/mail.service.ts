var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDIBLUE_API_KEY;

async function sendMail({
    from,
    to,
    html,
    text,
    subject
} : {
    from?: string;
    to: string | [string];
    html: string;
    text: string;
    subject: string;
}) {

    console.log("send_mail", {
        from,
        to,
        html,
        text,
        subject
    })
    return undefined;
    // Uncomment below two lines to configure authorization using: partner-key
    // var partnerKey = defaultClient.authentications['partner-key'];
    // partnerKey.apiKey = 'YOUR API KEY';
    /* var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
        sender: {
            email: from || "etienne.robert1698@gmail.com"
        },
        to: typeof to === 'string' ? [{email: to}] : to.map(e => {email: e}),
        htmlContent: html,
        textContent: text,
        subject,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(response);
    return response; */
}

export default {
    sendMail
}