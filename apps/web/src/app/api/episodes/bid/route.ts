import { NextResponse, type NextRequest } from 'next/server';
import { selectAuctionBidPointAmount } from 'src/entities/auction/supabase';
import { selectUserBidPointAmount, selectUserTotalBidPoint, updateEpisodeBid } from 'src/entities/episode/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get('user_id');
  const auctionId = searchParams.get('auction_id');

  let res;

  if (!userId && !auctionId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (userId) {
      res = await selectUserBidPointAmount(userId);
    }

    if (auctionId) {
      res = await selectAuctionBidPointAmount(auctionId);
    }

    if (auctionId && userId) {
      res = await selectUserTotalBidPoint(auctionId, userId!);
    }

    return NextResponse.json(res, { status: 201 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { episodeId, bidPoint } = await request.json();

  if (!episodeId || !bidPoint) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await updateEpisodeBid(episodeId, bidPoint);

    return NextResponse.json(res, { status: 201 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
