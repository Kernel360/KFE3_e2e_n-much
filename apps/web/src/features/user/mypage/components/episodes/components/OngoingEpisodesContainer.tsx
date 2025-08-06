import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import EmptyState from 'src/shared/ui/EmptyState';
import type { EpisodesContainerProps } from 'src/entities/user/mypage/episodes/types';

const OngoingEpisodesContainer = ({ episodes, currentTab }: EpisodesContainerProps) => {
  if (!episodes || episodes.length === 0) {
    return (
      <EmptyState title="진행중인 에피소드가 없습니다" description="새로운 경매에 참여해보세요" className="mt-24" />
    );
  }

  return (
    <ul>
      {episodes.map((episode) => (
        <MyEpisodeListItem key={episode.episode_id} episode={episode} currentTab={currentTab} />
      ))}
    </ul>
  );
};

export default OngoingEpisodesContainer;
