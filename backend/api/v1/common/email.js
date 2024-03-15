
require('dotenv').config();
const nodemailer = require('nodemailer');


let sentEmailByHtmlFormate = async (receiverEmailAddress, subject, bodyText = "", buttonText = "", buttonLink = "") => {

    // New Code 

    var transporter = nodemailer.createTransport({
        host: process.env.send_email_host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.send_email_address,
            pass: process.env.send_email_password
        }
    });

    var mailOptions = {
        from: process.env.send_email_address,
        to: receiverEmailAddress,
        subject: subject,
        html: await getHTMLBody(bodyText, buttonText, buttonLink)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return {
                success: false,
                message: "Email send fail"
            }
        } else {
            console.log("send email");
            return {
                success: true,
                message: "Email send successfully done"
            }
        }
    });

}

let getHTMLBody = async (body = "", buttonText = "", buttonLink = "") => {
    return `<div style="padding: 40px 30px; 
        background-color: white; 
        filter: drop-shadow( 0 0 20px rgba(0,0,0,.16));
        border-radius: 10px;
        max-width: 400px;
        margin: auto;
        ">

        <img style="width: 80px;" src="" alt="Kratos logo">

        <p style="font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 18px;
            margin: 40px 0 0 0;">${body}</p>

        

        <a href="${buttonLink}">
            <button style="width: 100%;
            padding: 10px 0px;
            background-color: #00E2F2;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 14px;
            border: none;
            border-radius: 5px;
            margin-top: 10px;
            cursor: pointer;">${buttonText}</button>
        </a>

        </div>`
}

module.exports = {
    sentEmailByHtmlFormate
}