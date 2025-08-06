import { selectUserChatRooms } from 'src/entities/chat/supabase';
import ChatListWrapper from 'src/features/chat/components/ChatListWrapper';

const ChatList = async () => {
  let chatRooms = [];

  try {
    chatRooms = await selectUserChatRooms();
  } catch (error) {
    console.error('채팅방 목록 조회 오류:', error);
  }

  return <ChatListWrapper initialChatRooms={chatRooms} />;
};

export default ChatList;
