import Link from "next/link";

export default function PostItem({ post }) {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100">
      <Link
        href={`/posts/${post._id}`}
        className="text-xl font-bold text-blue-800 hover:underline"
      >
        {post.title}
      </Link>
    </li>
  );
}
