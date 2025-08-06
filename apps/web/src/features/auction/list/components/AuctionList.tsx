'use client';

import { useEffect } from 'react';
import { AUCTION_LIST_SKELETON_LENGTH } from 'src/entities/auction/constants';
import { useAuctionListQuery } from 'src/entities/auction/queries/auction';
import AuctionCard from 'src/features/auction/shared/AuctionCard';
import ErrorState from 'src/shared/ui/ErrorState';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import AuctionBaseCardSkeleton from '../../skeleton/card/AuctionBaseCardSkeleton';
import type { AuctionListProps, EpisodeCount } from 'src/entities/auction/types';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionList = ({ order, keyword, auctionCount, from }: AuctionListProps) => {
  //TODO - nextjs 캐시로 관리하기 (KMH)
  const { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, hasNextPage, ref, inView } =
    useAuctionListQuery(order, keyword);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  //TODO - 에러 발생을 이미지로 표시하기 (KMH)
  if (isError) {
    console.error(error);
    return <ErrorState />;
  }

  //TODO - 총 경매 갯수도 총 경매의 갯수로 수정하기 (KMH)
  //TODO - 검색 결과가 없습니다. 이미지나 다른 컴포넌트로 수정하기 (KMH)
  return (
    <>
      <h3 className="pb-2 pt-1 text-sm">
        {fetchedAuctions
          ? keyword
            ? `${keyword}에 대한 검색 결과입니다.`
            : `총 ${auctionCount}개의 경매가 있습니다.`
          : '총 0개의 경매가 있습니다'}
      </h3>
      <ul className="grid grid-cols-2 gap-2">
        {isPending &&
          Array.from({ length: AUCTION_LIST_SKELETON_LENGTH }).map(() => <AuctionBaseCardSkeleton key={uuidv4()} />)}
        {fetchedAuctions &&
          !isPending &&
          fetchedAuctions.pages.map((page) =>
            page.data.map((auction: AuctionRow & EpisodeCount) => {
              const { auction_id: auctionId, title, end_date: endDate, episodes } = auction;
              const { image_urls: imageUrls, favorites } = auction;
              const episodeCount = episodes[0]['count'];
              const favoriteCount = favorites.length;
              const previewImage = imageUrls[0];

              return (
                <AuctionCard
                  key={`${auctionId}`}
                  auctionId={auctionId}
                  imageSrc={previewImage}
                  title={title}
                  endDate={endDate}
                  episodeCount={episodeCount}
                  favoriteCount={favoriteCount}
                  from={from}
                />
              );
            })
          )}
      </ul>
      <div className="flex w-full justify-center" ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};
export default AuctionList;
