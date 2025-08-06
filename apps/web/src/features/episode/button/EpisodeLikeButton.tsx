'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { FaThumbsUp } from 'react-icons/fa6';
import { getEpisodeInfo } from 'src/entities/episode/api';
import { postUserLikesEpisode } from 'src/entities/user/mypage/episodes/api';
import {
  LIKE_EPISODE_BID_POINT_BUYER,
  LIKE_EPISODE_BID_POINT_SELLER
} from 'src/entities/user/mypage/episodes/constants';
import { popToast } from 'src/shared/utils/popToast';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeLikeToggle = ({
  episode,
  userId,
  isSeller
}: {
  episode: EpisodeItemProps;
  userId: string;
  isSeller: boolean;
}) => {
  const episodeId = episode.episode_id;
  const prevLikes = episode.likes;
  const isIncluded = prevLikes.includes(userId);

  const [isLiked, setIsLiked] = useState(isIncluded);

  const mutate = useMutation<
    string,
    Error,
    { episodeId: string; updatedLikes: string[]; updatedBidPoint: number },
    void
  >({
    mutationFn: async ({ episodeId, updatedLikes, updatedBidPoint }) => {
      const result = await postUserLikesEpisode({ episodeId, updatedLikes, updatedBidPoint });
      return result;
    },
    onMutate: () => {
      setIsLiked((state) => !state);
    },
    onError: () => {
      setIsLiked((state) => !state);
    }
  });

  const handleLikeMarkClick = async () => {
    try {
      // 버튼 클릭 시점에 최신 값 가져오기
      const episodeInfo = await getEpisodeInfo(episodeId);

      const currentLikes = episodeInfo.likes;
      const currentBidPoint = episodeInfo.bid_point;

      const updatedLikes = isLiked ? currentLikes.filter((item) => item !== userId) : [...currentLikes, userId];

      const updatedBidPoint = isLiked
        ? currentBidPoint! - (isSeller ? LIKE_EPISODE_BID_POINT_SELLER : LIKE_EPISODE_BID_POINT_BUYER)
        : currentBidPoint! + (isSeller ? LIKE_EPISODE_BID_POINT_SELLER : LIKE_EPISODE_BID_POINT_BUYER);

      const result = await mutate.mutateAsync({ episodeId, updatedLikes, updatedBidPoint });
      if (result) {
        const alertTitle = isLiked ? '좋아요 해제 성공' : '좋아요 등록 성공';
        const alertMessage = isLiked ? '좋아요를 해제했습니다.' : '좋아요를 등록했습니다.';
        popToast('info', alertTitle, alertMessage, 'medium');
      }
    } catch (error) {
      if (error instanceof Error) {
        const alertTitle = isLiked ? '좋아요 해제 실패' : '좋아요 등록 실패';
        const alertMessage = isLiked ? '좋아요를 해제하지 못했습니다.' : '좋아요를 등록하지 못했습니다.';
        popToast('error', alertTitle, alertMessage, 'medium');

        console.error(error.message);
      }
    }
  };

  return (
    <Button variant="text" className="opacity-70" disabled={false} onClick={handleLikeMarkClick}>
      <FaThumbsUp className={`${isLiked ? 'text-(--color-accent)' : 'text-(--color-warm-gray)'} transition`} />
    </Button>
  );
};

export default EpisodeLikeToggle;
