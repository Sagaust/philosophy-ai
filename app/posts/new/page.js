"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [theme, setTheme] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [paragraphs, setParagraphs] = useState([""]);
  const [sidebarImages, setSidebarImages] = useState([""]);
  const [conclusion, setConclusion] = useState("");
  const [bibliography, setBibliography] = useState([""]);
  const [acknowledgment, setAcknowledgment] = useState("");
  const [links, setLinks] = useState([""]);
  const [multimedia, setMultimedia] = useState([""]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        theme,
        title,
        abstract,
        introduction,
        paragraphs,
        sidebarImages,
        conclusion,
        bibliography,
        acknowledgment,
        links,
        multimedia,
      }),
    });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <div>
          <label className="block text-gray-700 mb-2">Theme</label>
          <input
            type="text"
            placeholder="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Abstract</label>
          <textarea
            placeholder="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Introduction</label>
          <textarea
            placeholder="Introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-2">{`Paragraph ${index + 1}`}</label>
            <textarea
              placeholder={`Paragraph ${index + 1}`}
              value={paragraph}
              onChange={(e) => {
                const newParagraphs = [...paragraphs];
                newParagraphs[index] = e.target.value;
                setParagraphs(newParagraphs);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setParagraphs([...paragraphs, ""])}
          className="bg-blue-800 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Paragraph
        </button>
        {sidebarImages.map((image, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-2">{`Sidebar Image ${index + 1}`}</label>
            <input
              type="text"
              placeholder={`Sidebar Image ${index + 1}`}
              value={image}
              onChange={(e) => {
                const newImages = [...sidebarImages];
                newImages[index] = e.target.value;
                setSidebarImages(newImages);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSidebarImages([...sidebarImages, ""])}
          className="bg-blue-800 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Sidebar Image
        </button>
        <div>
          <label className="block text-gray-700 mb-2">Conclusion</label>
          <textarea
            placeholder="Conclusion"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        {bibliography.map((entry, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-2">{`Bibliography Entry ${index + 1}`}</label>
            <textarea
              placeholder={`Bibliography Entry ${index + 1}`}
              value={entry}
              onChange={(e) => {
                const newEntries = [...bibliography];
                newEntries[index] = e.target.value;
                setBibliography(newEntries);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setBibliography([...bibliography, ""])}
          className="bg-blue-800 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Bibliography Entry
        </button>
        <div>
          <label className="block text-gray-700 mb-2">Acknowledgment</label>
          <textarea
            placeholder="Acknowledgment"
            value={acknowledgment}
            onChange={(e) => setAcknowledgment(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        {links.map((link, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-2">{`Link ${index + 1}`}</label>
            <input
              type="text"
              placeholder={`Link ${index + 1}`}
              value={link}
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[index] = e.target.value;
                setLinks(newLinks);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setLinks([...links, ""])}
          className="bg-blue-800 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Link
        </button>
        {multimedia.map((media, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-2">{`Multimedia ${index + 1}`}</label>
            <input
              type="text"
              placeholder={`Multimedia ${index + 1}`}
              value={media}
              onChange={(e) => {
                const newMedia = [...multimedia];
                newMedia[index] = e.target.value;
                setMultimedia(newMedia);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setMultimedia([...multimedia, ""])}
          className="bg-blue-800 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Multimedia
        </button>
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
