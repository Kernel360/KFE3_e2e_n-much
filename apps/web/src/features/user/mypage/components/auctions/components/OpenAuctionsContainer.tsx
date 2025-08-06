import MyAuctionListItem from 'src/features/user/mypage/components/auctions/components/MyAuctionListItem';
import EmptyState from 'src/shared/ui/EmptyState';
import type { AuctionsContainerProps } from 'src/entities/user/mypage/auctions/types';

const OpenAuctionsContainer = ({ auctions, currentTab }: AuctionsContainerProps) => {
  if (!auctions || auctions.length === 0) {
    return <EmptyState title="진행 중인 경매가 없어요" description="새로운 경매를 시작해보세요" className="mt-24" />;
  }

  return (
    <ul>
      {auctions.map((auction) => (
        <MyAuctionListItem key={auction.auction_id} auction={auction} currentTab={currentTab} />
      ))}
    </ul>
  );
};

export default OpenAuctionsContainer;
