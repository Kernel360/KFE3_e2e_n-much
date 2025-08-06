import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AUCTION_BID_POINT_AMOUNT } from 'src/entities/auction/constants';
import {
  deleteEpisodeInfo,
  getEpisodeTotalBidPointByUser,
  getUserPointAmount,
  patchEpisodeBid
} from 'src/entities/episode/api';
import {
  episodesListKeys,
  USER_BID_POINT_AMOUNT_KEY,
  USER_TOTAL_BID_POINT_AMOUNT_KEY
} from 'src/entities/episode/queries/keys/queryKeyFactory';
import type { AuctionRow, EpisodeRow, UserRow } from 'src/shared/supabase/types';

export const useDeleteEpisodeMutation = ({
  auctionId,
  currentPage
}: {
  auctionId: EpisodeRow['auction_id'];
  currentPage: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (episodeId: EpisodeRow['episode_id']) => deleteEpisodeInfo(episodeId),
    onMutate: () => {
      const toastId = toast.loading('사연을 삭제중입니다. 잠시만 기다려주세요');
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success('정상적으로 삭제 되었습니다.');
      queryClient.invalidateQueries({
        queryKey: episodesListKeys.item({ auctionId, page: currentPage })
      });
    },
    onError: (_, __, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error('사연을 삭제하지 못했습니다. 다시 시도해주세요.');
    }
  });
};

export const usePatchEpisodeBidMutation = (auctionId: string | null, userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ episodeId, bidPoint }: { episodeId: EpisodeRow['episode_id']; bidPoint: EpisodeRow['bid_point'] }) =>
      patchEpisodeBid(episodeId, bidPoint),
    onMutate: () => {
      const toastId = toast.loading('입찰을 처리중입니다. 잠시만 기다려주세요');
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success('입찰을 성공하셨습니다.');
      queryClient.invalidateQueries({
        queryKey: [USER_BID_POINT_AMOUNT_KEY, auctionId, userId]
      });
      queryClient.invalidateQueries({
        queryKey: [USER_TOTAL_BID_POINT_AMOUNT_KEY, auctionId, userId]
      });

      queryClient.invalidateQueries({
        queryKey: [AUCTION_BID_POINT_AMOUNT, auctionId]
      });
    },
    onError: (_, __, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error('사연 입찰에 실패하였습니다. 다시 시도해주세요.');
    }
  });
};

export const useUserPointQuery = (
  auctionId: AuctionRow['auction_id'],
  userId: UserRow['id'],
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [USER_BID_POINT_AMOUNT_KEY, auctionId, userId],
    queryFn: () => getUserPointAmount(userId),
    enabled: options?.enabled ?? true
  });
};

export const useEpisodeTotalBidPointByUserQuery = (
  auctionId: AuctionRow['auction_id'],
  userId: EpisodeRow['user_id'],
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [USER_TOTAL_BID_POINT_AMOUNT_KEY, auctionId, userId],
    queryFn: () => getEpisodeTotalBidPointByUser(auctionId, userId),
    enabled: options?.enabled ?? true
  });
};
