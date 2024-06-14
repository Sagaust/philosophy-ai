export default function PostHeader({ title, author, date }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">
        By {author} on {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}
