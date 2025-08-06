'use client';
import { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@repo/ui/components/ui/pagination';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';
import { getEpisodesWithPagination } from 'src/entities/episode/api';
import { EPISODES_PER_PAGE } from 'src/entities/episode/constants';
import { episodesListKeys } from 'src/entities/episode/queries/keys/queryKeyFactory';
import { usePageActions } from 'src/entities/episode/stores/usePaginationStore';
import EpisodeCard from 'src/features/episode/card/EpisodeCard';
import EpisodeEmpty from 'src/features/episode/shared/EpisodeEmpty';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeList = ({
  episodesCount,
  auctionInfo
}: {
  episodesCount: number;
  auctionInfo: AuctionInfoWithAddressType;
}) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { setCurrentPage } = usePageActions();
  const totalPages = Math.max(1, Math.ceil(episodesCount / EPISODES_PER_PAGE));

  const { isError, data: episodesList } = useQuery({
    queryKey: episodesListKeys.item({ auctionId: auctionInfo.auction_id, page }),
    queryFn: () => getEpisodesWithPagination(auctionInfo.auction_id, page),
    placeholderData: keepPreviousData,
    staleTime: 50000
  });

  // ANCHOR - 다음 페이지 prefetch
  useEffect(() => {
    // 마지막 페이지까지만 데이터를 받음
    if (page <= totalPages - 1) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: episodesListKeys.item({ auctionId: auctionInfo.auction_id, page: nextPage }),
        queryFn: () => getEpisodesWithPagination(auctionInfo.auction_id, nextPage)
      });
    }
  }, [page, queryClient, totalPages, auctionInfo.auction_id]);

  const handlePageChange = (nextPage: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(nextPage);
      setCurrentPage(nextPage);
    }

    //"사연 모음" 타이틀로 스크롤 이동
    const headerEl = document.getElementById('episode-section-header');
    if (headerEl) {
      headerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isError || !episodesList || episodesList.length === 0) {
    return <EpisodeEmpty />;
  }

  return (
    <>
      {/* 사연 목록 */}
      <ul className="space-y-5 divide-y">
        {episodesList.map((episode: EpisodeItemProps, index) => (
          <EpisodeCard key={`${episode.episode_id}${index}`} episode={episode} sellerId={auctionInfo.user_id} />
        ))}
      </ul>
      {/* 페이지 네이션 */}
      <div className="px-6 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* 페이지 번호 동적 생성 */}
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
                className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default EpisodeList;
