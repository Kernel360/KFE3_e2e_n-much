'use client';
import { useSearchParams } from 'next/navigation';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserAuctions } from 'src/entities/user/mypage/auctions/queries/useAuctions';
import { useTabState } from 'src/entities/user/mypage/hooks/useTabState';
import ClosedAuctionsContainer from 'src/features/user/mypage/components/auctions/components/ClosedAuctionsContainer';
import OpenAuctionsContainer from 'src/features/user/mypage/components/auctions/components/OpenAuctionsContainer';
import MyAuctionsTabSkeleton from 'src/features/user/mypage/components/auctions/skeleton/MyAuctionsTabSkeleton';
import BaseTabs from 'src/features/user/mypage/components/shared/tabs/BaseTabs';
import ErrorState from 'src/shared/ui/ErrorState';
import { AUCTION_STATUS } from 'src/shared/utils/getAuctionStatusText';
import type { AuctionRow } from 'src/shared/supabase/types';

const TAB_LABELS = {
  open: '경매 현황',
  closed: '경매 종료'
};

const MyAuctionsTabContainer = () => {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get('tab') || 'open';

  const { currentTab } = useTabState({ defaultTab: tabFromQuery });
  const user = useUserState();
  const { data, isPending, isError, refetch } = useGetUserAuctions(user?.id);

  if (!user) return <MyAuctionsTabSkeleton />;
  if (isPending) return <MyAuctionsTabSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const openAuctions = data?.filter((auction: AuctionRow) => auction.status === AUCTION_STATUS.OPEN);
  const closedAuctions = data?.filter((auction: AuctionRow) => auction.status === AUCTION_STATUS.CLOSED);

  const TAB_CONTENTS = [
    { value: 'open', content: <OpenAuctionsContainer auctions={openAuctions} currentTab="open" /> },
    {
      value: 'closed',
      content: <ClosedAuctionsContainer auctions={closedAuctions} currentTab="closed" />
    }
  ];

  return <BaseTabs defaultValue={currentTab} tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default MyAuctionsTabContainer;
