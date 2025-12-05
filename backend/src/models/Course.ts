import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  instructor: string;
  category: string;
  totalHours: number;
  image: string;
  rating: number;
  reviews: number;
  youtubeUrl: string;
  description?: string;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  totalHours: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  youtubeUrl: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', courseSchema);
