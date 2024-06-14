"use client";

import { useState } from "react";

export default function CommentForm({ postId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, postId }),
    });
    if (res.ok) {
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-800 text-white px-4 py-2 rounded-md mt-2"
      >
        Submit
      </button>
    </form>
  );
}
