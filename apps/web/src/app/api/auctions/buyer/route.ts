import { type NextRequest, NextResponse } from 'next/server';
import { selectHasUserWrittenEpisode } from 'src/entities/episode/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('user_id');
  const auctionId = searchParams.get('auction_id');

  if (!userId || !auctionId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await selectHasUserWrittenEpisode(auctionId, userId);
    return NextResponse.json(res, { status: 201 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
