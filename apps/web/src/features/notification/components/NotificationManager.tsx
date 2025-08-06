'use client';

import { useState } from 'react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { toast } from '@repo/ui/components/ui/sonner';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useNotificationSubscription } from 'src/entities/notification/hooks/useNotificationSubscription';
import NotificationButton from 'src/features/notification/components/NotificationButton';

const NotificationManager = () => {
  const { isSupported, isDenied, isSubscribed, subscribe } = useNotificationSubscription();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserState();

  if (!isSupported || !user) return <Skeleton className="size-8 rounded-full" />;

  const handleClick = async () => {
    if (isDenied) {
      toast.warning('브라우저 알림 권한이 차단되어 있습니다. 설정에서 허용해주세요.');
      return; // ⛔ 여기서 함수 종료: Popover 열림 방지
    }

    if (!isSubscribed) {
      const success = await subscribe(user.id); // ✅ 구독 성공 여부 확인
      if (!success) return; // ⛔ 실패 시 Popover 열지 않음
    }

    if (isSubscribed) {
      setIsOpen(true); // ✅ 차단이 아니고 구독에 성공한 경우에만 Popover 열기
    }
  };
  return <NotificationButton isOpen={isOpen} onPopoverToggle={setIsOpen} onClick={handleClick} />;
};

export default NotificationManager;
