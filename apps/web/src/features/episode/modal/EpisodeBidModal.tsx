'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/components/ui/dialog';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useAuctionBidPointQuery } from 'src/entities/auction/queries/auction';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useEpisodeTotalBidPointByUserQuery, useUserPointQuery } from 'src/entities/episode/queries/episode';
import EpisodeBidButton from 'src/features/episode/button/EpisodeBidButton';
import EpisodeBidModalForm from 'src/features/episode/form/EpisodeBidModalForm';
import EmptyState from 'src/shared/ui/EmptyState';
import { formatNumber } from 'src/shared/utils/formatNumber';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeBidModal = ({ episode, isSeller }: { episode: EpisodeItemProps; isSeller: boolean }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useUserState();

  const {
    data: userPoint,
    isPending: isUserPending,
    isError: isUserError
  } = useUserPointQuery(episode.auction_id!, user!.id, { enabled: open });

  const {
    data: auctionPoint,
    isPending: isAuctionPending,
    isError: isaActionError
  } = useAuctionBidPointQuery(episode.auction_id!, { enabled: open });

  const {
    data: userTotalBidPoint,
    isPending: isBidPending,
    isError: isBidError
  } = useEpisodeTotalBidPointByUserQuery(episode.auction_id!, user!.id, { enabled: open });

  const isTotalLoading = isUserPending || isAuctionPending || isBidPending;
  const isTotalError = isUserError || isaActionError || isBidError;
  const isEpisodeUser = episode.user_id === user?.id;
  const isUserRole = user?.role;

  // 입찰하기 버튼
  const handleBidModalToggle = () => {
    if (isEpisodeUser && isUserRole !== 'buyer') {
      toast.info('입찰 참여자로 변경해주세요.');
      return;
    }

    if (isSeller && isUserRole !== 'seller') {
      toast.info('경매 판매자로 변경해주세요.');
      return;
    }

    setOpen(true);
  };

  if (isTotalLoading && open) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle hidden />
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <EmptyState
            title="현재 입찰 정보를 불러오는 중입니다..."
            description="잠시만 기다려주세요"
            className="py-10"
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (isTotalError && open) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <EpisodeBidButton onClick={() => setOpen(true)} variant="inActive" />
        </DialogTrigger>
        <DialogTitle hidden />
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <EmptyState
            title="현재 입찰 정보를 불러오지 못했습니다."
            description="잠시 후 다시 시도해주세요."
            className="py-10"
          />
          <Button variant="inActive" className="mb-4" onClick={() => router.refresh()}>
            다시 시도
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild> */}
        <EpisodeBidButton onClick={handleBidModalToggle} variant="active" className="hover:bg-(--color-primary)" />
        {/* </DialogTrigger> */}

        <DialogContent aria-describedby={undefined} className="p-10">
          <div className="flex flex-col items-center gap-4 pt-4">
            <DialogHeader className="mb-4">
              <DialogTitle>{episode.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col items-center">
              <span className="text-(--color-warm-gray) mb-1 text-sm">현재 사연 입찰가</span>
              <span className="text-(--color-text-base) text-xl font-bold">{formatNumber(episode.bid_point!)}P</span>
            </DialogDescription>
            <DialogDescription className="text-center">
              <span className="text-(--color-accent) mb-2 text-sm">
                현재 보유 포인트: {formatNumber(userPoint)}&nbsp;P
              </span>
            </DialogDescription>
          </div>
          <EpisodeBidModalForm
            auctionPoint={auctionPoint!}
            userPoint={userPoint!}
            userTotalBidPoint={userTotalBidPoint!}
            episode={episode}
            role={user!.role}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EpisodeBidModal;
