import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log('dismiss', res);
  return NextResponse.json({ message: 'dismiss' }, { status: 200 });
}
