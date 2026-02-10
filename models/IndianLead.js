import mongoose from 'mongoose';

const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  CLOSED: 'closed',
  REJECTED: 'rejected',
};

const IndianLeadSchema = new mongoose.Schema(
  {
    source: { type: String, default: 'ads', trim: true }, // ads | website | other

    contact: {
      fullName: { type: String, required: true, trim: true },
      mobile: { type: String, required: true, trim: true },
      whatsappSame: { type: Boolean, default: true },
      email: { type: String, trim: true, lowercase: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
    },

    requirement: {
      appGoal: { type: String, trim: true }, // business | startup | internal | idea
      appType: { type: String, trim: true }, // android | ios | both | web
      category: { type: String, trim: true }, // ecommerce | crm | booking | custom | other
      description: { type: String, trim: true },
    },

    filters: {
      budgetINR: { type: String, trim: true }, // <25k | 25k-75k | 75k-2L | 2L-5L | 5L+
      timeline: { type: String, trim: true }, // asap | 1month | 2-3months | flexible
      readyToStart: { type: Boolean, default: false },
    },

    businessContext: {
      businessType: { type: String, trim: true }, // individual | shop | company | startup
      hasGST: { type: Boolean, default: false },
      decisionMaker: { type: Boolean, default: true },
    },

    extras: {
      needsBackend: { type: Boolean, default: false },
      needsDesign: { type: Boolean, default: false },
      publishToStore: { type: Boolean, default: true },
    },

    leadScore: { type: Number, default: 0 },
    priority: { type: String, default: 'low', trim: true }, // low | medium | high
    status: { type: String, default: LEAD_STATUS.NEW, enum: Object.values(LEAD_STATUS) },

    meta: {
      utmSource: { type: String, trim: true },
      utmMedium: { type: String, trim: true },
      utmCampaign: { type: String, trim: true },
      utmContent: { type: String, trim: true },
      utmTerm: { type: String, trim: true },
      referrer: { type: String, trim: true },
      landingPage: { type: String, trim: true },
      userAgent: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

IndianLeadSchema.index({ 'contact.mobile': 1, createdAt: -1 });
IndianLeadSchema.index({ status: 1, priority: 1, createdAt: -1 });

export { LEAD_STATUS };
export default mongoose.models.IndianLead || mongoose.model('IndianLead', IndianLeadSchema);

