'use server';

import { revalidatePath } from 'next/cache';
import { insertMessage, markMessagesAsRead } from 'src/entities/chat/supabase';

export const sendMessage = async (formData: FormData) => {
  const chatRoomId = formData.get('chat_room_id') as string;
  const content = formData.get('content') as string;

  if (!chatRoomId || !content.trim()) {
    throw new Error('메시지 내용이 필요합니다.');
  }

  try {
    await insertMessage({ chat_room_id: chatRoomId, content: content.trim() });
    // 해당 페이지 새로고침 (메시지 목록 업데이트)
    revalidatePath('/chat/[id]', 'page');
  } catch (error) {
    console.error('메시지 전송 오류:', error);
    throw new Error('메시지 전송에 실패했습니다.');
  }
};

export const markMessagesAsReadAndRevalidate = async (chatRoomId: string) => {
  // 읽음 처리
  await markMessagesAsRead(chatRoomId);
  // 채팅방 목록 새로고침
  revalidatePath('/chat');
};
