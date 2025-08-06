import { NextResponse, type NextRequest } from 'next/server';
import { insertMessage, selectMessagesByChatRoomId } from 'src/entities/chat/supabase';

// POST: 메시지 전송
export async function POST(request: NextRequest) {
  const { chat_room_id, content } = await request.json();

  if (!chat_room_id || !content) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const message = await insertMessage({ chat_room_id, content });
    return NextResponse.json(message, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// GET: 특정 채팅방의 메시지들 조회
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const chat_room_id = searchParams.get('chat_room_id');

  if (!chat_room_id) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const messages = await selectMessagesByChatRoomId(chat_room_id);
    return NextResponse.json(messages, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
