export default function ShareButtons({ url }) {
  const shareText = encodeURIComponent("Check out this amazing post!");
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${shareText}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div className="flex space-x-4 mt-8">
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Twitter
      </a>
      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:underline"
      >
        Facebook
      </a>
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-800 hover:underline"
      >
        LinkedIn
      </a>
    </div>
  );
}
