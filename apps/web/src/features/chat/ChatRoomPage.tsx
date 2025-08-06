import { selectUserIdByAuctionId } from 'src/entities/auction/serverActions';
import { getServerUser } from 'src/entities/auth/serverAction';
import { upsertChatRoom } from 'src/entities/chat/supabase';
import ChatContent from 'src/features/chat/components/ChatContent';
import ChatMessageForm from 'src/features/chat/components/ChatMessageForm';
import ChatObject from 'src/features/chat/components/ChatObject';
import { createServer } from 'src/shared/supabase/client/server';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const ChatRoomPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  // 채팅방 ID 가져오기
  let chatRoomId = null;
  let auctionData = null;
  let sellerInfo = null;

  try {
    const currentUser = await getServerUser();
    const supabase = await createServer();

    const { data: auction } = await supabase
      .from('auctions')
      .select('auction_id, title, user_id, image_urls')
      .eq('auction_id', auctionId)
      .single();

    let sellerData = null;
    if (auction?.user_id) {
      const { data: seller } = await supabase
        .from('users')
        .select('nick_name, user_avatar')
        .eq('id', auction.user_id)
        .single();

      sellerData = seller;
    }

    auctionData = auction
      ? {
          ...auction,
          seller: sellerData
        }
      : null;
    sellerInfo = sellerData;

    if (currentUser) {
      const sellerId = await selectUserIdByAuctionId(auctionId);

      // 현재 사용자가 seller인지 buyer인지 확인
      const isSellerOfAuction = currentUser.id === sellerId;
      let chatRoom;

      if (isSellerOfAuction) {
        // 판매자라면: 기존 채팅방 찾기
        const { data: existingRooms } = await supabase
          .from('chat_rooms')
          .select('*')
          .eq('auction_id', auctionId)
          .eq('seller_id', sellerId)
          .neq('buyer_id', currentUser.id)
          .order('created_at', { ascending: false });

        if (existingRooms && existingRooms.length > 0) {
          chatRoom = existingRooms[0];
        }
      } else {
        // 구매자라면: 기존 로직
        chatRoom = await upsertChatRoom({
          auction_id: auctionId,
          seller_id: sellerId,
          buyer_id: currentUser.id
        });
      }

      chatRoomId = chatRoom?.id;
    }
  } catch (error) {
    console.error('채팅방 조회 오류:', error);
  }

  return (
    <>
      <DetailPageHeader>{sellerInfo?.nick_name || '판매자'}</DetailPageHeader>
      <ChatObject auctionData={auctionData} />
      <PageContainer className="pb-22 relative flex max-h-[calc(100vh-146px)] min-h-[calc(100vh-146px)] flex-col">
        <ChatContent auctionId={auctionId} />
        <ChatMessageForm auctionId={auctionId} chatRoomId={chatRoomId} />
      </PageContainer>
    </>
  );
};

export default ChatRoomPage;
