import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String },
    excerpt: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    tags: [{ type: String }],
    categories: [{ type: String }],
    featured: { type: Boolean, default: false },
    coverImage: { 
      url: { type: String },
      publicId: { type: String },
      width: { type: Number },
      height: { type: Number }
    },
    images: [{
      url: { type: String },
      publicId: { type: String },
      width: { type: Number },
      height: { type: Number },
      caption: { type: String }
    }]
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);