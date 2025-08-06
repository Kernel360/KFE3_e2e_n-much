import AuctionItemSkeleton from 'src/features/user/mypage/components/auctions/skeleton/AuctionItemSkeleton';
import TabsSkeleton from 'src/features/user/mypage/components/shared/skeleton/TabsSkeleton';

const MyAuctionsTabSkeleton = () => (
  <div>
    <TabsSkeleton />
    <ul>
      {Array.from({ length: 3 }).map((_, index) => (
        <AuctionItemSkeleton key={index} />
      ))}
    </ul>
  </div>
);

export default MyAuctionsTabSkeleton;
