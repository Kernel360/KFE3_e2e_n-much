import { NextResponse } from 'next/server';
import { updateLikeEpisode } from 'src/entities/user/mypage/episodes/supabase';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { episodeId, updatedLikes, updatedBidPoint } = await request.json();

  if (!episodeId || !updatedLikes || (!updatedBidPoint && updatedBidPoint !== 0)) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }
  try {
    const res = await updateLikeEpisode({ episodeId, updatedLikes, updatedBidPoint });
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
