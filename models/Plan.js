import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      enum: ['web', 'app', 'seo'],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // Optional label for ranges or custom display, e.g. "₹5,000 – ₹8,000 (one-time)"
    priceText: {
      type: String,
      trim: true,
    },
    monthly: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);

