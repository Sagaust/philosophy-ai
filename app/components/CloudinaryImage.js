import { Cloudinary } from "cloudinary-core";

const cloudinary = new Cloudinary({ cloud_name: "your-cloud-name" });

export default function CloudinaryImage({ src, alt, className }) {
  const imageUrl = cloudinary.url(src, { width: 300, crop: "scale" });
  return <img src={imageUrl} alt={alt} className={className} />;
}
