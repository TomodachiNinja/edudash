import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success';
  read: boolean;
}

const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'alert', 'success'], default: 'info' },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', notificationSchema);
