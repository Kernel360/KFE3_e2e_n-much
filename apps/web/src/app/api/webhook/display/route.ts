import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log('display', res);
  return NextResponse.json({ message: 'display' }, { status: 200 });
}
