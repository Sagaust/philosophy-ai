import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  theme: String,
  title: String,
  abstract: String,
  introduction: String,
  paragraphs: {
    type: [String],
    default: [],
  },
  sidebarImages: {
    type: [String],
    default: [],
  },
  conclusion: String,
  bibliography: {
    type: [String],
    default: [],
  },
  acknowledgment: String,
  links: {
    type: [String],
    default: [],
  },
  multimedia: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
