import { NextResponse } from 'next/server';
import { selectFavoriteAuctionCardList } from 'src/entities/user/mypage/auctions/supabase';
import type { NextRequest } from 'next/server';

// 관심 경매의 경매 리스트 가져오기 - KSH
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const order = searchParams.get('order');
  const page = searchParams.get('page');
  const userId = searchParams.get('userId');
  let res = null;

  if (!order || !page || !userId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (order === 'favorites') {
      res = await selectFavoriteAuctionCardList(order, Number(page), userId);
    } else if (order === 'end_date') {
      res = await selectFavoriteAuctionCardList(order, Number(page), userId);
    } else if (order === 'created_at') {
      res = await selectFavoriteAuctionCardList(order, Number(page), userId);
    }

    if (!res) {
      return NextResponse.json({ error: '400: order의 값이 올바르지 않습니다.' }, { status: 400 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
