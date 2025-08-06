import { NextResponse, type NextRequest } from 'next/server';
import { upsertChatRoom, selectUserChatRooms } from 'src/entities/chat/supabase';

export async function POST(request: NextRequest) {
  const { auction_id, seller_id, buyer_id } = await request.json();

  if (!auction_id || !seller_id || !buyer_id) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const chatRoom = await upsertChatRoom({ auction_id, seller_id, buyer_id });
    return NextResponse.json(chatRoom, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const chatRooms = await selectUserChatRooms();
    return NextResponse.json(chatRooms, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
