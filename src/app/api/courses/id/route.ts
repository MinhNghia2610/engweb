// src/app/api/courses/[id]/route.ts
import { connectDB } from '../../../lib/mongodb';
import { Course } from '../../../models/Courses';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });
  }

  const course = await Course.findById(params.id);
  if (!course) {
    return NextResponse.json({ error: 'Không tìm thấy khóa học' }, { status: 404 });
  }

  return NextResponse.json({ course });
}
