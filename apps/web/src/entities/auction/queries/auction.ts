import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getAddressId, getAuction, getAuctionCardList, patchAuction, postAuction } from 'src/entities/auction/api';
import { AUCTION_BID_POINT_AMOUNT, SECONDS_TO_MS, STALE_TIME_SECONDS } from 'src/entities/auction/constants';
import { addressIdKeys, auctionFormKeys, auctionListKeys } from 'src/entities/auction/queries/queryKeyFactory';
import { getAuctionBidPointAmount } from 'src/entities/episode/api';
import { popToast } from 'src/shared/utils/popToast';
import type { EpisodeCount, FetchedAuction } from 'src/entities/auction/types';
import type { AuctionInsert, AuctionRow, AuctionUpdate } from 'src/shared/supabase/types';

export const prefetchAuction = async (auctionId: string, queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: auctionFormKeys.item(auctionId),
    queryFn: () => getAuction(auctionId),
    staleTime: Infinity
  });
};

export const useAuctionQuery = (auctionIdParam: string | undefined) => {
  const {
    data: fetchedAuction,
    isLoading: isAuctionFetching,
    isError: isAuctionFetchingError,
    error: fetchingAuctionError
  } = useQuery({
    queryKey: auctionFormKeys.item(auctionIdParam as string),
    queryFn: (): Promise<FetchedAuction> => getAuction(auctionIdParam as string),
    enabled: !!auctionIdParam,
    staleTime: Infinity
  });

  return { fetchedAuction, isAuctionFetching, isAuctionFetchingError, fetchingAuctionError };
};

export const usePostAuctionQuery = (auctionId: string | undefined) => {
  const queryClient = new QueryClient();

  const { mutateAsync: mutatePostAuction, isPending: isPostAuctionPending } = useMutation({
    mutationFn: (formData: AuctionInsert): Promise<AuctionRow> => postAuction(formData),
    onSuccess: () => {
      if (auctionId) {
        queryClient.invalidateQueries({ queryKey: auctionFormKeys.item(auctionId) });
      }

      popToast('success', '경매 등록 성공', '경매 등록에 성공했습니다.', 'medium');
    }
  });
  return { mutatePostAuction, isPostAuctionPending };
};

export const usePatchAuctionQuery = (auctionId: string | undefined) => {
  const queryClient = new QueryClient();

  const { mutateAsync: mutatePatchAuction, isPending: isPatchAuctionPending } = useMutation({
    mutationFn: (patchMutationParam: {
      auctionIdParam: string | undefined;
      patchAuctionParam: AuctionUpdate;
    }): Promise<AuctionRow> => patchAuction(patchMutationParam.auctionIdParam, patchMutationParam.patchAuctionParam),
    onSuccess: () => {
      if (auctionId) {
        queryClient.invalidateQueries({ queryKey: auctionFormKeys.item(auctionId) });
      }

      popToast('success', '경매 수정 성공', '경매 수정에 성공했습니다.', 'medium');
    }
  });
  return { mutatePatchAuction, isPatchAuctionPending };
};

export const prefetchAuctionList = async (order: string, keyword: string | undefined, queryClient: QueryClient) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: auctionListKeys.order(order),
    queryFn: ({
      pageParam
    }: {
      pageParam: number;
    }): Promise<{
      data: (AuctionRow & EpisodeCount)[];
      nextId: number;
    }> => getAuctionCardList({ order, keyword, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId
  });
};

export const useAuctionListQuery = (order: string, keyword: string | undefined) => {
  const { ref, inView } = useInView();
  const {
    data: fetchedAuctions,
    isError,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: auctionListKeys.order(order),
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      getAuctionCardList({ order, keyword, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId,
    staleTime: STALE_TIME_SECONDS * SECONDS_TO_MS,
    enabled: !!order
  });

  return { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, hasNextPage, ref, inView };
};

export const useAuctionBidPointQuery = (auctionId: AuctionRow['auction_id'], options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [AUCTION_BID_POINT_AMOUNT, auctionId],
    queryFn: () => getAuctionBidPointAmount(auctionId),
    enabled: options?.enabled ?? true
  });
};

export const prefetchAddressId = async (loggedInUserId: string, queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: () => getAddressId(loggedInUserId)
  });
};
