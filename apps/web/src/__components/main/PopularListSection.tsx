import Link from 'next/link';
import { fetchSortedAuctions } from 'src/entities/auction/serverActions';

import PopularAuctionCard from './PopularAuctionCard';
import PageTitle from '../../shared/ui/PageTitle';
import { SortedAuctionItemType } from 'src/entities/auction/types';

const PopularListSection = async () => {
  const popularAuctions = await fetchSortedAuctions('favorites', false, 4);

  if (!popularAuctions || popularAuctions.length === 0) {
    return (
      <div className="h-50 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500">
        아직 등록된 정보가 없어요
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <PageTitle>인기 경매</PageTitle>
        <Link href="/auctions?order=favorites" className="text-(--color-accent) cursor-pointer text-sm">
          더보기
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {popularAuctions.map((auction: SortedAuctionItemType) => (
          <PopularAuctionCard key={auction.auction_id} auction={auction} />
        ))}
      </ul>
    </div>
  );
};

export default PopularListSection;
