import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Order } from '@/app/models/Order';

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}
