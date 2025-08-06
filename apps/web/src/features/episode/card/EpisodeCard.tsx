'use client';

import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/useAuthStore';
import EpisodeActionButtons from 'src/features/episode/button/EpisodeActionButtons';
import EpisodeLikeButton from 'src/features/episode/button/EpisodeLikeButton';
import EpisodeBidModal from 'src/features/episode/modal/EpisodeBidModal';
import EpisodeInfoModal from 'src/features/episode/modal/EpisodeInfoModal';
import { type AuctionRow } from 'src/shared/supabase/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import PageDescription from 'src/shared/ui/PageDescription';
import PageTitle from 'src/shared/ui/PageTitle';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import { maskEmail } from 'src/shared/utils/maskEmail';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeCard = ({ episode, sellerId }: { episode: EpisodeItemProps; sellerId: AuctionRow['user_id'] }) => {
  const user = useUserState();
  const userInfoFinding = useUserLoadingState();

  // 스켈레톤 처리
  if (userInfoFinding || !user) {
    return (
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 py-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-9" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <div className="flex flex-col items-end justify-center"></div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center justify-between py-4">
          <Skeleton className="h-4 w-9" />
        </div>
      </div>
    );
  }

  // 경매 물품의 판매자
  const isSellerUser = sellerId === user.id;
  // 사연 작성자
  const isEpisodeActions = episode.user_id === user.id;
  const userNickname = episode.users.nick_name ?? user.nick_name;

  return (
    <li className="list-none">
      <div className="flex justify-between">
        {/* 작성자 정보 */}
        <div className="flex gap-2 py-4">
          <BaseAvatar src={episode.users.user_avatar!} alt={userNickname} size="sm" />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium">{userNickname}</p>
              <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(episode.users.email)}&#41;</p>
            </div>
            <p className="text-(--color-warm-gray) text-xs">{formatYYYYMMDD(episode.created_at)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          {/* 입찰 모달  */}
          {(isSellerUser || isEpisodeActions) && <EpisodeBidModal episode={episode} isSeller={isSellerUser} />}

          {/* 좋아요 버튼 */}
          {isEpisodeActions ? null : <EpisodeLikeButton episode={episode} userId={user.id} isSeller={isSellerUser} />}
        </div>
      </div>
      <div>
        <PageTitle as="h4" className="mb-1 font-medium" order="left" size="md">
          {episode.title}
        </PageTitle>
        <PageDescription variant="ghost" clamp={2}>
          {episode.description}
        </PageDescription>
      </div>
      <div className="flex items-center justify-between">
        <EpisodeInfoModal episode={episode} />
        {/* 수정 및 삭제 */}
        {isEpisodeActions && <EpisodeActionButtons auctionId={episode.auction_id} episodeId={episode.episode_id} />}
      </div>
    </li>
  );
};

export default EpisodeCard;
