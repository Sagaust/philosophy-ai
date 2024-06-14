import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, email, password } = req.body;

  await connectToDatabase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "user", // Default role
  });

  await newUser.save();

  res.status(201).json({ message: "User created!" });
}
