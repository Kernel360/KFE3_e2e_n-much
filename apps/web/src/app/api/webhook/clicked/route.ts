import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log('clicked', res);
  return NextResponse.json({ message: 'clicked' }, { status: 200 });
}
