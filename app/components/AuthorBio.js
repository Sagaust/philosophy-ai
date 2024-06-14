export default function AuthorBio({ author }) {
  return (
    <div className="mt-8 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">About the Author</h2>
      <p>{author.bio}</p>
    </div>
  );
}
