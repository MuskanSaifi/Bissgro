import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
    },
    contentImagePublicIds: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    // SEO fields
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    metaKeywords: { type: String, trim: true },
    metaImage: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    focusKeyword: { type: String, trim: true },
    robots: { type: String, enum: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'], default: 'index,follow' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
