// models/Course.ts
import mongoose, { Schema, Document, models, model } from 'mongoose'

interface CourseDocument extends Document {}

const CourseSchema: Schema = new Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  level: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default models.Course || model<CourseDocument>('Course', CourseSchema)
