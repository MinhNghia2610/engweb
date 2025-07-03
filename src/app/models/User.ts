import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String, // mã hoá sau
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)