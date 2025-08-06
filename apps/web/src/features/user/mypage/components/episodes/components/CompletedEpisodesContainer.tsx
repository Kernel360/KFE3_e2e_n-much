import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import EmptyState from 'src/shared/ui/EmptyState';
import type { EpisodesContainerProps } from 'src/entities/user/mypage/episodes/types';

const CompletedEpisodesContainer = ({ episodes, currentTab }: EpisodesContainerProps) => {
  if (!episodes || episodes.length === 0) {
    return (
      <EmptyState
        title="종료된 에피소드가 없습니다"
        description="경매가 종료되면 여기에 표시됩니다"
        className="mt-24"
      />
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

export default CompletedEpisodesContainer;
