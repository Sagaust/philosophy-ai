import connectToDatabase from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req) {
  const { username, email } = await req.json();

  await connectToDatabase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists!" }), {
      status: 422,
    });
  }

  const verificationCode = crypto.randomBytes(3).toString("hex");

  const hashedPassword = await bcrypt.hash(verificationCode, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "user", // Default role
  });

  await newUser.save();

  // Send email with verification code
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);

  return new Response(
    JSON.stringify({
      message: "User created! Verification code sent to email.",
    }),
    { status: 201 },
  );
}
