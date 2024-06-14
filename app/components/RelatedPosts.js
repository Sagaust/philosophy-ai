import Link from "next/link";

export default function RelatedPosts({ relatedPosts }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      <ul>
        {relatedPosts.map((post) => (
          <li key={post._id} className="mb-4">
            <Link href={`/posts/${post._id}`}>
              <a className="text-blue-600 hover:underline">{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
