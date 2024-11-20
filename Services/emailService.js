const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmail = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

module.exports = { sendEmail };