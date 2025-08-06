'use client';

import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { ROLE_CONFIG } from 'src/entities/user/mypage/main/constants';
import { useUserBidPoint } from 'src/entities/user/mypage/points/queries/usePoints';
import AddressStatus from 'src/features/user/mypage/components/main/AddressStatus';
import MyPageUserProfileSkeleton from 'src/features/user/mypage/components/main/skeleton/MyPageUserProfileSkeleton';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import ErrorState from 'src/shared/ui/ErrorState';
import PointDisplay from 'src/shared/ui/PointDisplay';
import BaseCard from 'src/widgets/BaseCard';

const MyPageUserProfile = () => {
  const user = useUserState();
  const { data: userPoints, isLoading: pointLoading, isError: pointError } = useUserBidPoint(user?.id);
  if (!user || !user.role || !['buyer', 'seller'].includes(user.role)) {
    return <MyPageUserProfileSkeleton />;
  }

  const { nick_name: name, email, user_avatar: avatarUrl } = user;

  const currentRole = (user.role || 'buyer') as keyof typeof ROLE_CONFIG;
  const currentConfig = ROLE_CONFIG[currentRole];
  if (!currentConfig) return null;
  if (pointLoading) return <MyPageUserProfileSkeleton />;
  if (pointError) return <ErrorState />;

  return (
    <BaseCard as="section" variant="primary">
      <div className="flex items-start justify-between pb-1">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
          <p className="text-(--color-warm-gray) text-sm">{email}</p>
        </div>
        <div className="bg-(--color-primary) relative flex size-14 shrink-0 overflow-hidden rounded-full text-white">
          <BaseAvatar src={avatarUrl || ''} alt={name ? `${name} 프로필 이미지` : '사용자 프로필 이미지'} size="xl" />
        </div>
      </div>
      {currentRole === 'seller' && <AddressStatus />}
      <div className="border-(--color-warm-gray)/30 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">보유 포인트</p>
          <PointDisplay amount={userPoints || 0} />
        </div>
      </div>
    </BaseCard>
  );
};

export default MyPageUserProfile;
