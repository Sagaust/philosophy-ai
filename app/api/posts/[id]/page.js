import connectToDatabase from "../../../lib/db";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CloudinaryImage from "../../components/CloudinaryImage"; // Import CloudinaryImage component

export default async function PostDetails({ params }) {
  const { id } = params;
  await connectToDatabase();
  const post = await Post.findById(id).lean();
  const comments = await Comment.find({ postId: id }).lean();

  if (!post) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  const {
    theme = "",
    title = "",
    abstract = "",
    introduction = "",
    paragraphs = [],
    sidebarImages = [],
    conclusion = "",
    bibliography = [],
    acknowledgment = "",
    links = [],
    multimedia = [],
  } = post;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <h2 className="text-xl mb-2">{theme}</h2>
      <div className="prose prose-lg max-w-none mb-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{abstract}</ReactMarkdown>
      </div>
      <div className="prose prose-lg max-w-none mb-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {introduction}
        </ReactMarkdown>
      </div>
      {paragraphs.length > 0 &&
        paragraphs.map((paragraph, index) => (
          <div key={index} className="prose prose-lg max-w-none mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {paragraph}
            </ReactMarkdown>
            {sidebarImages[index] && (
              <CloudinaryImage
                src={sidebarImages[index]}
                alt={`Sidebar Image ${index + 1}`}
                className="float-right ml-4 mb-4 w-1/3"
              />
            )}
          </div>
        ))}
      <div className="prose prose-lg max-w-none mb-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{conclusion}</ReactMarkdown>
      </div>
      <div className="prose prose-lg max-w-none mb-4">
        <h2>Bibliography</h2>
        <ul>
          {bibliography.length > 0 &&
            bibliography.map((entry, index) => (
              <li key={index}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {entry}
                </ReactMarkdown>
              </li>
            ))}
        </ul>
      </div>
      <div className="prose prose-lg max-w-none mb-4">
        <h2>Acknowledgment</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {acknowledgment}
        </ReactMarkdown>
      </div>
      <div className="prose prose-lg max-w-none mb-4">
        <h2>Links</h2>
        <ul>
          {links.length > 0 &&
            links.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="prose prose-lg max-w-none mb-4">
        <h2>Multimedia</h2>
        <ul>
          {multimedia.length > 0 &&
            multimedia.map((media, index) => (
              <li key={index}>
                <a
                  href={media}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {media}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentList comments={comments} />
        <CommentForm postId={id} />
      </div>
    </div>
  );
}
