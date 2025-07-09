import nodemailer from 'nodemailer';

export async function sendMail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL || "seninsimon002@gmail.com",
    pass: process.env.APP_PASSWORD || "ayghazgxuqybncco",
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL || "seninsimon002@gmail.com",
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  });
}