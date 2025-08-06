import EpisodeItemSkeleton from 'src/features/user/mypage/components/episodes/skeleton/EpisodeItemSkeleton';
import TabsSkeleton from 'src/features/user/mypage/components/shared/skeleton/TabsSkeleton';

const MyEpisodesTabSkeleton = () => (
  <div>
    <TabsSkeleton />
    <ul>
      {Array.from({ length: 3 }).map((_, index) => (
        <EpisodeItemSkeleton key={index} />
      ))}
    </ul>
  </div>
);

export default MyEpisodesTabSkeleton;
