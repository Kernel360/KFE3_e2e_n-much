import { NextResponse } from 'next/server';
import { selectLikeEpisodesByUserId } from 'src/entities/user/mypage/episodes/supabase';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('userId');
  let res = null;

  if (!userId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    res = await selectLikeEpisodesByUserId(userId);

    if (!res) {
      return NextResponse.json({ error: '400: userId의 값이 올바르지 않습니다.' }, { status: 400 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
