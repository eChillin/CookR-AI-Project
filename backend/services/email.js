const nodemailer = require('nodemailer');

module.exports = async function sendVerificationEmail(to, code) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "YOUR_EMAIL@gmail.com",
            pass: "YOUR_APP_PASSWORD"
        }
    });

    await transporter.sendMail({
        from: "Cookr App <YOUR_EMAIL@gmail.com>",
        to,
        subject: "Your Cookr Verification Code",
        text: `Your verification code is: ${code}`
    });

    return true;
}
