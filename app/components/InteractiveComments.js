"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function InteractiveComments({ comments, postId }) {
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code to submit comment
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="mb-4 border p-4 rounded-lg">
            <ReactMarkdown>{comment.content}</ReactMarkdown>
            <div className="text-sm text-gray-600">
              By {comment.author} on{" "}
              {new Date(comment.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border rounded-lg"
          rows="4"
          placeholder="Add a comment..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
