"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const elements = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      );
      setHeadings(
        elements.map((el) => ({
          text: el.textContent,
          id: el.id,
          level: el.tagName.toLowerCase(),
        })),
      );
    }
  }, []);

  return (
    <nav className="mb-8 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Table of Contents</h2>
      <ul className="list-disc pl-4">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`ml-${heading.level === "h2" ? 4 : heading.level === "h3" ? 8 : 0}`}
          >
            <a
              href={`#${heading.id}`}
              className="text-blue-600 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
