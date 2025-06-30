import { connectDB } from '../../lib/mongodb';
import { Course } from '../../models/Courses';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const courses = await Course.find();
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const data = await req.json();
  await connectDB();
  const newCourse = await Course.create(data);
  return NextResponse.json(newCourse);
}