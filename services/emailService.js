const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config(); // To load the .env variables

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOrderConfirmation = async (userEmail, orderDetails) => {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, '../views/emails/orderConfirmation.ejs'),
      { order: orderDetails }
    );

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: 'Order Confirmation',
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendOrderConfirmation };
