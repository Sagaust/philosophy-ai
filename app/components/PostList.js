import PostItem from "./PostItem";

export default function PostList({ posts }) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
}
