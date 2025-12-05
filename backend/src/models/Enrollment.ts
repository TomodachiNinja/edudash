import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  progress: number;
  hoursCompleted: number;
  status: 'active' | 'completed' | 'paused';
}

const enrollmentSchema = new Schema<IEnrollment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0 },
  hoursCompleted: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' }
}, { timestamps: true });

export default mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
