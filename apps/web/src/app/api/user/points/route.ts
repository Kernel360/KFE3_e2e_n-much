import { NextResponse, type NextRequest } from 'next/server';
import { selectPointsByUserId } from 'src/entities/user/mypage/points/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: '유저 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const res = await selectPointsByUserId(userId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error ${error}` }, { status: 500 });
  }
}
