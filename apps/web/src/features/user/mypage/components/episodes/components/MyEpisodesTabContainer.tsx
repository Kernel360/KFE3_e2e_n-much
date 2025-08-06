'use client';

import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserEpisodes } from 'src/entities/user/mypage/episodes/queries/useEpisodes';
import { useTabState } from 'src/entities/user/mypage/hooks/useTabState';
import CompletedEpisodesContainer from 'src/features/user/mypage/components/episodes/components/CompletedEpisodesContainer';
import OngoingEpisodesContainer from 'src/features/user/mypage/components/episodes/components/OngoingEpisodesContainer';
import MyEpisodesTabSkeleton from 'src/features/user/mypage/components/episodes/skeleton/MyEpisodesTabSkeleton';
import BaseTabs from 'src/features/user/mypage/components/shared/tabs/BaseTabs';
import ErrorState from 'src/shared/ui/ErrorState';
import { AUCTION_STATUS } from 'src/shared/utils/getAuctionStatusText';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

const TAB_LABELS = {
  ongoing: '진행중',
  completed: '종료됨'
};

const MyEpisodesTabContainer = () => {
  const { currentTab } = useTabState({ defaultTab: 'ongoing' });
  const user = useUserState();
  const { data, isPending, isError, refetch } = useGetUserEpisodes(user?.id);

  if (!user) return <MyEpisodesTabSkeleton />;
  if (isPending) return <MyEpisodesTabSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const ongoingEpisodes = data?.filter(
    (episode: EpisodeWithAuction) => episode.auctions?.status === AUCTION_STATUS.OPEN
  );
  const completedEpisodes = data?.filter(
    (episode: EpisodeWithAuction) => episode.auctions?.status === AUCTION_STATUS.CLOSED
  );

  const TAB_CONTENTS = [
    { value: 'ongoing', content: <OngoingEpisodesContainer episodes={ongoingEpisodes} currentTab="ongoing" /> },
    {
      value: 'completed',
      content: <CompletedEpisodesContainer episodes={completedEpisodes} currentTab="completed" />
    }
  ];

  return <BaseTabs defaultValue={currentTab} tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default MyEpisodesTabContainer;
