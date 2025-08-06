import Image from 'next/image';
import { formatShortDateTime } from 'src/shared/utils/formatKoreanDate';
import type { Message } from 'src/entities/chat/types';

interface ChatMessageListItemProps {
  message: Message;
  currentUserId: string;
}

const ChatMessageListItem = ({ message, currentUserId }: ChatMessageListItemProps) => {
  const { sender, sender_id: senderId, content, created_at: createdAt, is_read: isRead } = message;
  const isMyMessage = senderId === currentUserId;

  return (
    <li>
      <div className={`flex gap-4 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
        {!isMyMessage && (
          <div className="rounded-full">
            <div className="bg-(--color-warm-gray) relative flex size-12 items-center justify-center overflow-hidden rounded-full">
              {sender?.user_avatar ? (
                <Image src={sender.user_avatar} alt={sender.nick_name} fill className="object-cover" sizes="48px" />
              ) : (
                <span>{sender?.nick_name?.[0] || '?'}</span>
              )}
            </div>
          </div>
        )}
        <div className="relative">
          <p
            className={`flex rounded-md p-4 text-sm text-white ${
              isMyMessage ? 'bg-(--color-accent)' : 'bg-(--color-primary)'
            }`}
          >
            {content}
          </p>
          {/* 말풍선 꼬리 */}
          <div
            className={`absolute top-3 h-0 w-0 border-b-[15px] border-t-[15px] border-b-transparent border-t-transparent ${
              isMyMessage
                ? 'border-l-(--color-accent) -right-2 border-l-[15px]'
                : 'border-r-(--color-primary) -left-2 border-r-[15px]'
            }`}
          ></div>
        </div>
      </div>
      {/* 시간과 읽음 상태 */}
      <div className={`flex items-center gap-1 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
        <time className={`text-(--color-text-base)/60 text-xs ${isMyMessage ? 'text-right' : 'text-left'}`}>
          {formatShortDateTime(createdAt)}
        </time>
        {/* 내가 보낸 메시지에만 읽음 상태 표시 */}
        {isMyMessage && (
          <span className={`text-xs ${isRead ? 'text-(--color-accent)' : 'text-gray-400'}`}>
            {isRead ? '읽음' : '안읽음'}
          </span>
        )}
      </div>
    </li>
  );
};

export default ChatMessageListItem;
