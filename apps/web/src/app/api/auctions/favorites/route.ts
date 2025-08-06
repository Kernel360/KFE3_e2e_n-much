import { NextResponse } from 'next/server';
import { updateFavoriteAuction } from 'src/entities/user/mypage/auctions/supabase';
import type { NextRequest } from 'next/server';

// 관심 경매 갱신(추가/제거) - KSH
export async function POST(request: NextRequest) {
  const { auctionId, updatedFavorites } = await request.json();

  if (!auctionId || !updatedFavorites) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }
  try {
    const res = await updateFavoriteAuction({ auctionId, updatedFavorites });
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
