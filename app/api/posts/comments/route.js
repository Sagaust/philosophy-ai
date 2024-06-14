import connectToDatabase from "../../../lib/db";
import Comment from "../../../models/Comment";

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const newComment = new Comment(data);
  await newComment.save();
  return new Response(JSON.stringify(newComment), {
    status: 201,
  });
}
