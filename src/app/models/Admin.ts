import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: 'admin';
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, {
  collection: 'admin',
});

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
