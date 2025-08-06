// ChatListWrapper.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import ChatListItem from 'src/features/chat/components/ChatListItem';
import { createClient } from 'src/shared/supabase/client/client';
import type { ChatRoom } from 'src/entities/chat/types';

interface ChatListWrapperProps {
  initialChatRooms: ChatRoom[];
}

interface RealtimePayload {
  new?: {
    chat_room_id?: string;
    [key: string]: unknown;
  };
  old?: {
    chat_room_id?: string;
    [key: string]: unknown;
  };
}

const ChatListWrapper = ({ initialChatRooms }: ChatListWrapperProps) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(initialChatRooms);
  const supabase = createClient();

  // useCallback으로 함수 최적화
  const updateChatRoomData = useCallback(
    async (chatRoomId: string) => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (!user) return;

        // 안읽은 메시지 개수 계산
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('chat_room_id', chatRoomId)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        // 마지막 메시지 가져오기 - 필요한 모든 필드 포함
        const { data: lastMessage } = await supabase
          .from('messages')
          .select('id, chat_room_id, sender_id, content, created_at, is_read, read_at')
          .eq('chat_room_id', chatRoomId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        // 채팅방 목록에서 해당 채팅방 업데이트
        setChatRooms((prev) =>
          prev.map((room) =>
            room.id === chatRoomId
              ? {
                  ...room,
                  unread_count: count || 0,
                  last_message: lastMessage
                    ? [
                        {
                          id: lastMessage.id,
                          chat_room_id: lastMessage.chat_room_id || '',
                          sender_id: lastMessage.sender_id || '',
                          content: lastMessage.content,
                          created_at: lastMessage.created_at || '',
                          is_read: lastMessage.is_read || false,
                          read_at: lastMessage.read_at || null
                        }
                      ]
                    : room.last_message
                }
              : room
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    [supabase]
  );

  useEffect(() => {
    // 실시간 구독 설정
    const channel = supabase
      .channel('chat-messages-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages'
        },
        (payload: RealtimePayload) => {
          const chatRoomId = payload.new?.chat_room_id || payload.old?.chat_room_id;
          if (chatRoomId) {
            updateChatRoomData(chatRoomId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, updateChatRoomData]);

  return (
    <ul>
      {chatRooms.length > 0 ? (
        chatRooms.map((chatRoom) => <ChatListItem key={chatRoom.id} chatRoom={chatRoom} />)
      ) : (
        <li className="p-5 text-center text-gray-500">아직 채팅방이 없습니다.</li>
      )}
    </ul>
  );
};

export default ChatListWrapper;
