import { selectUserIdByAuctionId } from 'src/entities/auction/serverActions';
import { getServerUser } from 'src/entities/auth/serverAction';
import { selectMessagesByChatRoomId, upsertChatRoom } from 'src/entities/chat/supabase';
import ChatMessageListClient from 'src/features/chat/components/ChatMessageListClient';
import { createServer } from 'src/shared/supabase/client/server';

const ChatMessageList = async ({ auctionId }: { auctionId: string }) => {
  let messages = [];
  let chatRoomId = null;
  let currentUser = null;

  try {
    // 1. 현재 로그인한 사용자 정보
    currentUser = await getServerUser();
    if (!currentUser) {
      return <li>로그인이 필요합니다.</li>;
    }

    // 2. 해당 경매의 판매자 ID 조회
    const sellerId = await selectUserIdByAuctionId(auctionId);

    // 3. 현재 사용자가 seller인지 buyer인지 확인
    const isSellerOfAuction = currentUser.id === sellerId;

    let chatRoom;

    if (isSellerOfAuction) {
      // 판매자라면: 기존에 있는 채팅방들 중에서 이 경매 관련 채팅방 찾기
      const supabase = await createServer();
      const { data: existingRooms } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('auction_id', auctionId)
        .eq('seller_id', sellerId)
        .neq('buyer_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (existingRooms && existingRooms.length > 0) {
        chatRoom = existingRooms[0]; // 가장 최근 채팅방 사용
      } else {
        return <li>아직 문의가 없습니다.</li>;
      }
    } else {
      // 구매자라면: 먼저 기존 채팅방 찾아보기
      const supabase = await createServer();
      const { data: existingRooms } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('auction_id', auctionId)
        .eq('seller_id', sellerId)
        .eq('buyer_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (existingRooms && existingRooms.length > 0) {
        chatRoom = existingRooms[0];
      } else {
        // 없으면 새로 생성
        chatRoom = await upsertChatRoom({
          auction_id: auctionId,
          seller_id: sellerId,
          buyer_id: currentUser.id
        });
      }
    }

    chatRoomId = chatRoom?.id;

    // 4. 해당 채팅방의 메시지들 조회 (초기 데이터)
    if (chatRoomId) {
      messages = await selectMessagesByChatRoomId(chatRoomId);
    }
  } catch (error) {
    console.error('메시지 조회 오류:', error);
    return <li>메시지를 불러오는 중 오류가 발생했습니다.</li>;
  }

  // currentUser가 없으면 (에러 케이스)
  if (!currentUser || !chatRoomId) {
    return <li>채팅방을 불러올 수 없습니다.</li>;
  }

  // 클라이언트 컴포넌트에 데이터 전달
  return <ChatMessageListClient initialMessages={messages} chatRoomId={chatRoomId} currentUserId={currentUser.id} />;
};

export default ChatMessageList;
