import { type NextRequest, NextResponse } from 'next/server';
import { selectSellerAuctionCount } from 'src/entities/auction/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sellerId = searchParams.get('id');

  try {
    if (!sellerId) {
      return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
    }

    const res = await selectSellerAuctionCount(sellerId);
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
