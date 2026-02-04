import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hero', 'services', 'about', 'tech', 'testimonials', 'cta', 'contact', 'html', 'features', 'newsletter'],
  },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  order: { type: Number, default: 0 },
}, { _id: true });

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
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    metaKeywords: { type: String, trim: true },
    metaImage: { type: String, trim: true },
    metaImagePublicId: { type: String, trim: true },
    imagePublicIds: { type: [String], default: [] },
    sections: [SectionSchema],
    published: { type: Boolean, default: true },
    isHome: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
