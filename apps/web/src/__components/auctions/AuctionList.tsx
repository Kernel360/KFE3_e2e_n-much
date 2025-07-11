'use client';

//TODO - 스피너 적용하기

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllAuctionWithEpisodeCount } from 'src/entities/auction/api';
import AuctionCard from '../common/AuctionCard';
import { AuctionRow } from 'src/shared/supabase/types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../features/auth/LoadingSpinner';

interface EpisodeCount {
  episodes: [{ count: number }];
}

export default function AuctionList({ order }: { order: string }) {
  const { ref, inView } = useInView();
  const {
    data: auctions,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['auctions', order],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      fetchAllAuctionWithEpisodeCount({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextId,
    staleTime: 5
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div>
      <h3 className="pb-2 pt-1 text-sm">{`총 ${auctions?.pages.reduce((total, page) => total + page.data.length, 0)}개의 경매가 있습니다`}</h3>
      <ul className="grid grid-cols-2 gap-3">
        {auctions &&
          auctions.pages.map((page) =>
            page.data.map((auction: AuctionRow & EpisodeCount) => {
              const { auction_id, status, title, current_point, end_time, episodes, address } = auction;
              let { image_urls, favorites } = auction;

              if (!image_urls) {
                image_urls = [];
              }
              if (!favorites) {
                favorites = [];
              }

              return (
                <AuctionCard
                  key={`${auction_id}`}
                  auction_id={auction_id}
                  address={address[0]}
                  status={status}
                  imageSrc={image_urls[0]}
                  title={title}
                  currentPoint={current_point}
                  endTime={end_time}
                  episodeCount={episodes[0]['count']}
                  favorites={favorites.length}
                />
              );
            })
          )}
        <div>
          <div ref={ref} onClick={() => fetchNextPage()}>
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </div>
      </ul>
    </div>
  );
}
