import connectToDatabase from "../../../../lib/db";
import User from "../../../../models/User";
import { authMiddleware, roleMiddleware } from "../../../../lib/auth";

export async function POST(req) {
  const { userId, role } = await req.json();

  await connectToDatabase();

  const user = await User.findById(userId);

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found!" }), {
      status: 404,
    });
  }

  user.role = role;
  await user.save();

  return new Response(JSON.stringify({ message: "Role assigned!" }), {
    status: 200,
  });
}
