import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Make sure you load environment variables

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // ✅ From .env
      pass: process.env.EMAIL_PASS, // ✅ Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
