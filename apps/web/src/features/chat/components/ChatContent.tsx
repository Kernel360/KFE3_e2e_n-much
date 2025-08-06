import ChatMessageList from 'src/features/chat/components/ChatMessageList';

const ChatContent = ({ auctionId }: { auctionId: string }) => {
  return (
    <div className="hide-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pr-4">
      <ChatMessageList auctionId={auctionId} />
    </div>
  );
};
export default ChatContent;
