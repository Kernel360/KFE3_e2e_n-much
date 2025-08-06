'use client';

import { useTabState } from 'src/entities/user/mypage/hooks/useTabState';
import FavoriteAuctionsContainer from 'src/features/user/mypage/components/favorites/components/FavoriteAuctionsContainer';
import LikedEpisodesContainer from 'src/features/user/mypage/components/favorites/components/LikedEpisodesContainer';
import BaseTabs from 'src/features/user/mypage/components/shared/tabs/BaseTabs';

const TAB_LABELS = {
  favorite: '관심 경매',
  like: '좋아한 스토리'
};

const FavoritesTabContainer = () => {
  const { currentTab } = useTabState({ defaultTab: 'favorite' });

  const TAB_CONTENTS = [
    { value: 'favorite', content: <FavoriteAuctionsContainer currentTab="favorite" /> },
    {
      value: 'like',
      content: <LikedEpisodesContainer currentTab="like" />
    }
  ];

  return <BaseTabs defaultValue={currentTab} tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default FavoritesTabContainer;
