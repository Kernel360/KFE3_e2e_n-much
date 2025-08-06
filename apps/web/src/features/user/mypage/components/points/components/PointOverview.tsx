'use client';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useUserBidPoint } from 'src/entities/user/mypage/points/queries/usePoints';
import PointOverviewSkeleton from 'src/features/user/mypage/components/points/skeleton/PointOverviewSkeleton';
import PageTitle from 'src/shared/ui/PageTitle';
import PointDisplay from 'src/shared/ui/PointDisplay';
import BaseCard from 'src/widgets/BaseCard';

const PointOverview = () => {
  const user = useUserState();
  const { data: point } = useUserBidPoint(user?.id);
  if (!user) return <PointOverviewSkeleton />;

  return (
    <BaseCard as="div" variant="primary" className="w-full text-center">
      <PageTitle as="h3" className="mb-1 text-sm font-normal">
        현재 보유 포인트
      </PageTitle>
      <PointDisplay amount={point} className="text-2xl" />
    </BaseCard>
  );
};

export default PointOverview;
