import connectToDatabase from "../../../lib/db";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import PostHeader from "../../components/PostHeader";
import InteractiveComments from "../../components/InteractiveComments";
import RelatedPosts from "../../components/RelatedPosts";
import AuthorBio from "../../components/AuthorBio";
import ShareButtons from "../../components/ShareButtons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CloudinaryImage from "../../components/CloudinaryImage";
import MultimediaCard from "../../components/MultimediaCard";

export default async function PostDetails({ params }) {
  const { id } = params;
  await connectToDatabase();
  const post = await Post.findById(id).lean();
  const comments = await Comment.find({ postId: id }).lean();

  let relatedPosts = [];
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    relatedPosts = await Post.find({
      tags: { $in: post.tags },
      _id: { $ne: id },
    })
      .limit(5)
      .lean();
  }

  const author = { bio: "Author biography goes here..." }; // Replace with actual author data

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
    <div className="w-full p-4">
      <PostHeader title={title} author="Author Name" date={post.date} />
      <div className="grid grid-cols-12 gap-4">
        {/* First Row: Abstract and Multimedia */}
        <div className="col-span-12 lg:col-span-8">
          <div className="prose prose-lg max-w-none">
            <h2>Abstract</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {abstract}
            </ReactMarkdown>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <MultimediaCard mediaUrls={multimedia} />
        </div>
      </div>

      {/* Main Content with Images */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl mb-2">{theme}</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {introduction}
            </ReactMarkdown>
          </div>
          {paragraphs.length > 0 &&
            paragraphs.map((paragraph, index) => (
              <div key={index} className="prose prose-lg max-w-none mb-4 flex">
                <div className="w-3/4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {paragraph}
                  </ReactMarkdown>
                </div>
                {sidebarImages[index] && (
                  <div className="w-1/4 pl-4">
                    <CloudinaryImage
                      src={sidebarImages[index]}
                      alt={`Sidebar Image ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          <div className="prose prose-lg max-w-none mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {conclusion}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Author Bio and Related Posts */}
      <AuthorBio author={author} />
      <RelatedPosts relatedPosts={relatedPosts} />

      {/* Comments Section */}
      <InteractiveComments comments={comments} postId={id} />

      {/* Share Buttons */}
      <ShareButtons
        url={typeof window !== "undefined" ? window.location.href : ""}
      />

      {/* Bibliography and Acknowledgment */}
      <div className="prose prose-lg max-w-none mt-8">
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
      <div className="prose prose-lg max-w-none mt-4">
        <h2>Acknowledgment</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {acknowledgment}
        </ReactMarkdown>
      </div>
    </div>
  );
}
