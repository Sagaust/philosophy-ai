import connectToDatabase from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found!" }), {
      status: 401,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid credentials!" }), {
      status: 401,
    });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return new Response(
    JSON.stringify({ token, userId: user._id, role: user.role }),
    { status: 200 },
  );
}
