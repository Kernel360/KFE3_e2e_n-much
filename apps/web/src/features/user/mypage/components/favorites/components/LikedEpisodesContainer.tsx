'use client';

import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserLikesEpisodes } from 'src/entities/user/mypage/favorites/queries/useUserLikesEpisodes';
import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import EmptyState from 'src/shared/ui/EmptyState';
import ErrorState from 'src/shared/ui/ErrorState';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

interface LikedEpisodesContainerProps {
  currentTab?: string;
}

const LikedEpisodesContainer = ({ currentTab }: LikedEpisodesContainerProps) => {
  const user = useUserState();
  const { data: episodes, isPending, isError } = useGetUserLikesEpisodes(user?.id);
  if (!user) return <div>로딩 중 입니다...!</div>;
  if (isPending) return <div>로딩 중 입니다...!</div>;
  if (isError) return <ErrorState />;

  if (!episodes || episodes.length === 0) {
    return (
      <EmptyState
        title="찜한 에피소드가 없어요"
        description="관심 있는 에피소드를 저장하고 다시 만나보세요"
        className="mt-24"
      />
    );
  }

  return (
    <ul>
      {episodes.map((episode: EpisodeWithAuction) => {
        return <MyEpisodeListItem key={episode.episode_id} episode={episode} currentTab={currentTab} />;
      })}
    </ul>
  );
};

export default LikedEpisodesContainer;
