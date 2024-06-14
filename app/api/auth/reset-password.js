import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, newPassword } = req.body;

  await connectToDatabase();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password updated!" });
}
