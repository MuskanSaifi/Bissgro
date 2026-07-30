import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'hero',
        'services',
        'about',
        'tech',
        'testimonials',
        'cta',
        'contact',
        'html',
        'features',
        'newsletter',
      ],
    },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const PageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: { type: String, required: true, trim: true },
    metaTitle: { type: String, trim: true, default: '' },
    // No maxlength — long SEO text must never block page create
    metaDescription: { type: String, trim: true, default: '' },
    metaKeywords: { type: String, trim: true, default: '' },
    metaImage: { type: String, trim: true, default: '' },
    metaImagePublicId: { type: String, trim: true, default: '' },
    imagePublicIds: { type: [String], default: [] },
    sections: [SectionSchema],
    published: { type: Boolean, default: true },
    isHome: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Drop cached model so schema updates (removed maxlength) apply after deploy/restart
if (mongoose.models.Page) {
  delete mongoose.models.Page;
}

export default mongoose.model('Page', PageSchema);
