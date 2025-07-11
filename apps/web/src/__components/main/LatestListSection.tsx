import Link from 'next/link';
import React from 'react';
import { fetchSortedAuctions } from 'src/entities/auction/serverActions';

import LatestAuctionCard from './LatestAuctionCard';
import PageTitle from '../../shared/ui/PageTitle';
import { SortedAuctionItemType } from 'src/entities/auction/types';

const LatestListSection = async () => {
  const latestAuctions = await fetchSortedAuctions('created_at', true, 10);

  if (!latestAuctions || latestAuctions.length === 0) {
    return (
      <div className="h-50 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500">
        아직 등록된 정보가 없어요
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <PageTitle>최신 경매</PageTitle>
        <Link href="/auctions?order=created_at" className="text-(--color-accent) cursor-pointer text-sm">
          더보기
        </Link>
      </div>
      <ul className="overflow-hidden rounded-lg bg-white shadow-sm">
        {latestAuctions.map((auction: SortedAuctionItemType) => (
          <LatestAuctionCard key={auction.auction_id} auction={auction} />
        ))}
      </ul>
    </div>
  );
};

export default LatestListSection;
