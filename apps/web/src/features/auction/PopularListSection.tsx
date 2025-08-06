import { POPULAR_AUCTIONS_COUNT } from 'src/entities/auction/constants';
import { getAuctionsCategory } from 'src/entities/auction/serverActions';
import { type SortedAuctionItemType } from 'src/entities/auction/types';
import PopularAuctionCard from 'src/features/auction/card/PopularAuctionCard';
import AuctionSectionHeader from 'src/features/auction/shared/AuctionSectionHeader';
import EmptyState from 'src/shared/ui/EmptyState';

const PopularListSection = async ({ from }: { from?: string }) => {
  const popularAuctions = await getAuctionsCategory('favorite_count', false, POPULAR_AUCTIONS_COUNT);

  if (!popularAuctions || popularAuctions.length === 0) {
    return (
      <EmptyState
        title="아직 등록된 상품 정보가 없어요."
        description="새로운 정보가 등록되면 알려드릴게요!"
        className="mt-8 rounded-lg border bg-white py-16 shadow-sm"
      />
    );
  }

  return (
    <div className="mt-8">
      <AuctionSectionHeader title="인기 경매" href={'/auctions?order=favorite_count'} />
      <div className="mb-4 flex items-center justify-between"></div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {popularAuctions.map((auction: SortedAuctionItemType) => (
          <PopularAuctionCard key={auction.auction_id} auction={auction} from={from} />
        ))}
      </ul>
    </div>
  );
};

export default PopularListSection;
