import MyAuctionListItem from 'src/features/user/mypage/components/auctions/components/MyAuctionListItem';
import EmptyState from 'src/shared/ui/EmptyState';
import type { AuctionsContainerProps } from 'src/entities/user/mypage/auctions/types';

const ClosedAuctionsContainer = ({ auctions, currentTab }: AuctionsContainerProps) => {
  if (!auctions || auctions.length === 0) {
    return (
      <EmptyState title="종료된 경매가 없어요" description="경매가 끝나면 여기서 확인할 수 있어요" className="mt-24" />
    );
  }

  return (
    <ul>
      {auctions.map((auction) => (
        <MyAuctionListItem key={auction.auction_id} auction={auction} currentTab={currentTab} />
      ))}
    </ul>
  );
};

export default ClosedAuctionsContainer;
