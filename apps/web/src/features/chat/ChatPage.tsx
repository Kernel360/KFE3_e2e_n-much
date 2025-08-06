import ChatList from 'src/features/chat/components/ChatList';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const ChatPage = () => {
  return (
    <>
      <DetailPageHeader>채팅</DetailPageHeader>
      <PageContainer className="p-0">
        <ChatList />
      </PageContainer>
    </>
  );
};

export default ChatPage;
