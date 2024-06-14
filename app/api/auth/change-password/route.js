import connectToDatabase from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found!" }), {
      status: 404,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  await user.save();

  return new Response(JSON.stringify({ message: "Password updated!" }), {
    status: 200,
  });
}
