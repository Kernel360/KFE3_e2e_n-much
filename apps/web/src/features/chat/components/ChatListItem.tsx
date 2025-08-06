import Image from 'next/image';
import Link from 'next/link';
import { formatShortDateTime } from 'src/shared/utils/formatKoreanDate';
import type { ChatRoom } from 'src/entities/chat/types';

interface ChatListItemProps {
  chatRoom: ChatRoom;
}

const ChatListItem = ({ chatRoom }: ChatListItemProps) => {
  // 상대방 정보 결정 (seller 또는 buyer)
  const otherUser = chatRoom.seller || chatRoom.buyer;
  const auctionInfo = chatRoom.auctions;

  return (
    <li className="border-(--color-warm-gray)/30 border-b bg-white px-5 py-4">
      <Link href={`/chat/${chatRoom.auction_id}`}>
        <div className="flex items-center gap-3">
          <div className="relative size-16 overflow-hidden rounded-lg border">
            {auctionInfo?.image_urls?.[0] ? (
              <Image
                src={auctionInfo.image_urls[0]}
                alt={auctionInfo.title || '경매 이미지'}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                이미지 없음
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-col items-start sm:flex-row sm:gap-1">
              <h3 className="font-medium">{auctionInfo?.title || '경매 제목'}</h3>
              <div>
                <span className="text-(--color-warm-gray) text-sm">{otherUser?.nick_name || '상대방'}</span>
                <span className="text-(--color-warm-gray)">•</span>
                <time className="text-(--color-warm-gray) text-sm">
                  {chatRoom.last_message?.[0]?.created_at
                    ? formatShortDateTime(chatRoom.last_message[0].created_at)
                    : formatShortDateTime(chatRoom.updated_at)}
                </time>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="flex justify-between text-sm">
                {chatRoom.last_message?.[0]?.content || '채팅을 시작해보세요'}
              </p>
              {/* 읽지 않은 메시지 수 표시 */}
              {chatRoom.unread_count > 0 && (
                <span className="bg-(--color-accent) ml-auto flex shrink-0 items-center justify-center rounded-full px-2 text-xs text-white">
                  {chatRoom.unread_count}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ChatListItem;
