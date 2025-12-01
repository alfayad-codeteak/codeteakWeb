import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactSubmission extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'new' | 'solved';
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'solved'],
    default: 'new',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Create indexes for faster queries
ContactSubmissionSchema.index({ timestamp: -1 });
ContactSubmissionSchema.index({ createdAt: -1 });
ContactSubmissionSchema.index({ status: 1 });
ContactSubmissionSchema.index({ email: 1 });
// Compound index for common query patterns
ContactSubmissionSchema.index({ status: 1, timestamp: -1 });

// Create model only if it doesn't exist
const ContactSubmission: Model<IContactSubmission> = 
  mongoose.models.ContactSubmission || 
  mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;

