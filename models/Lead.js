import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    source: { type: String, default: 'newsletter', trim: true },
  },
  { timestamps: true }
);

LeadSchema.index({ email: 1 });
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
