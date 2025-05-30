import mongoose from 'mongoose';
import { encryptText, decryptText } from '../utils/encryption';

interface ITextComparison extends mongoose.Document {
  originalText: string;
  comparedText: string;
  createdAt: Date;
}

const textComparisonSchema = new mongoose.Schema({
  originalText: {
    type: String,
    required: true
  },
  comparedText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt text before saving
textComparisonSchema.pre('save', function(next) {
  if (this.isModified('originalText')) {
    this.originalText = encryptText(this.originalText);
  }
  if (this.isModified('comparedText')) {
    this.comparedText = encryptText(this.comparedText);
  }
  next();
});

// Decrypt text after finding
textComparisonSchema.post('find', function(docs: ITextComparison[]) {
  docs.forEach(doc => {
    doc.originalText = decryptText(doc.originalText);
    doc.comparedText = decryptText(doc.comparedText);
  });
});

textComparisonSchema.post('findOne', function(doc: ITextComparison | null) {
  if (doc) {
    doc.originalText = decryptText(doc.originalText);
    doc.comparedText = decryptText(doc.comparedText);
  }
});

export const TextComparison = mongoose.model<ITextComparison>('TextComparison', textComparisonSchema); 