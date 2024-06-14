import connectToDatabase from "../../../lib/db";
import Post from "../../../models/Post";

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({});
  return new Response(JSON.stringify(posts), {
    status: 200,
  });
}

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const newPost = new Post({
    ...data,
    paragraphs: data.paragraphs || [],
    sidebarImages: data.sidebarImages || [],
    bibliography: data.bibliography || [],
    links: data.links || [],
    multimedia: data.multimedia || [],
  });
  await newPost.save();
  return new Response(JSON.stringify(newPost), {
    status: 201,
  });
}
