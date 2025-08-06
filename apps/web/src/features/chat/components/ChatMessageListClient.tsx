'use client';

import { useEffect, useState } from 'react';
import ChatListItem from 'src/features/chat/components/ChatMessageListItem';
import { createClient } from 'src/shared/supabase/client/client';
import type { Message } from 'src/entities/chat/types';

interface ChatMessageListClientProps {
  initialMessages: Message[];
  chatRoomId: string;
  currentUserId: string;
}

interface MessagePayload {
  new: {
    id: string;
    chat_room_id: string;
    sender_id: string;
    content: string;
    created_at: string;
    is_read: boolean;
    read_at?: string | null;
  };
}

const ChatMessageListClient = ({ initialMessages, chatRoomId, currentUserId }: ChatMessageListClientProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const supabase = createClient();

  useEffect(() => {
    // 컴포넌트 마운트 시 읽음 처리
    const handleReadMessages = async () => {
      try {
        const { markMessagesAsReadAndRevalidate } = await import('src/entities/chat/serverActions');
        await markMessagesAsReadAndRevalidate(chatRoomId);

        // 로컬 상태도 업데이트 (내가 받은 메시지들을 읽음 처리)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.sender_id !== currentUserId ? { ...msg, is_read: true, read_at: new Date().toISOString() } : msg
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    handleReadMessages();

    // 실시간 구독
    const channel = supabase
      .channel(`chat-room-${chatRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${chatRoomId}`
        },
        async (payload: MessagePayload) => {
          // sender 정보 따로 조회
          const { data: senderData } = await supabase
            .from('users')
            .select('id, nick_name, user_avatar')
            .eq('id', payload.new.sender_id)
            .single();

          const messageWithSender: Message = {
            id: payload.new.id,
            chat_room_id: payload.new.chat_room_id,
            sender_id: payload.new.sender_id,
            content: payload.new.content,
            created_at: payload.new.created_at,
            is_read: payload.new.sender_id !== currentUserId ? true : payload.new.is_read,
            read_at: payload.new.sender_id !== currentUserId ? new Date().toISOString() : payload.new.read_at,
            sender: senderData || undefined
          };

          // 새 메시지 자동 읽음 처리 (내가 보낸 메시지가 아닌 경우)
          if (payload.new.sender_id !== currentUserId) {
            try {
              await supabase
                .from('messages')
                .update({
                  is_read: true,
                  read_at: new Date().toISOString()
                })
                .eq('id', payload.new.id);
            } catch (error) {
              console.error(error);
            }
          }

          // 새 메시지를 기존 목록에 추가
          setMessages((prev) => [...prev, messageWithSender]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${chatRoomId}`
        },
        (payload: MessagePayload) => {
          // 메시지 읽음 상태 업데이트 (상대방이 내 메시지를 읽은 경우)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === payload.new.id
                ? {
                    ...msg,
                    is_read: payload.new.is_read,
                    read_at: payload.new.read_at
                  }
                : msg
            )
          );
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoomId, currentUserId, supabase]);

  return (
    <ul className="flex flex-col gap-3">
      {messages.length > 0 ? (
        messages.map((message) => {
          return <ChatListItem key={message.id} message={message} currentUserId={currentUserId} />;
        })
      ) : (
        <li>아직 메시지가 없습니다. 첫 메시지를 보내보세요!</li>
      )}
    </ul>
  );
};

export default ChatMessageListClient;
