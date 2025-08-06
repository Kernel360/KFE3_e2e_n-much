'use client';

import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserPoints } from 'src/entities/user/mypage/points/queries/usePoints';
import PointHistoryListItem from 'src/features/user/mypage/components/points/components/PointHistoryListItem';
import PointHistoryListSkeleton from 'src/features/user/mypage/components/points/skeleton/PointHistoryListSkeleton';
import EmptyState from 'src/shared/ui/EmptyState';
import ErrorState from 'src/shared/ui/ErrorState';
import type { PointRow } from 'src/shared/supabase/types';

const PointHistoryList = () => {
  const user = useUserState();
  const { data, isPending, isError, refetch } = useGetUserPoints(user?.id);

  if (!user) return <PointHistoryListSkeleton />;
  if (isPending) return <PointHistoryListSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="포인트 사용 내역이 없어요"
        description="포인트를 적립하거나 사용하면 여기서 확인할 수 있어요"
        className="mt-24"
      />
    );
  }

  return (
    <ul className="space-y-3">
      {data.map((point: PointRow) => (
        <PointHistoryListItem key={point.point_id} point={point} />
      ))}
    </ul>
  );
};

export default PointHistoryList;
