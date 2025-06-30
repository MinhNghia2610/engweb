import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
});

export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);