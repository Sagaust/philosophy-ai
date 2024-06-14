"use client";

import { useState } from "react";

const MultimediaCard = ({ mediaUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    );
    if (!videoIdMatch) {
      return null;
    }
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : mediaUrls.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < mediaUrls.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const embedUrl = getYouTubeEmbedUrl(mediaUrls[currentIndex]);

  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4">
      {embedUrl && (
        <iframe
          className="w-full h-64"
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultimediaCard;
