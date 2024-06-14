export default function CommentList({ comments }) {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment._id} className="bg-gray-100 p-4 rounded-md">
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
