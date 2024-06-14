import PostList from "./components/PostList";
import connectToDatabase from "../lib/db";
import Post from "../models/Post";

export default async function Home() {
  await connectToDatabase();
  const posts = await Post.find({}).lean();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Welcome to Digital Humanities</h1>
      <p className="mb-6">
        Explore articles, share insights, and delve into bibliographies.
      </p>
      <PostList posts={posts} />
    </div>
  );
}
