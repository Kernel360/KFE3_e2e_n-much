export type NotificationListType = 'popover' | 'full';

// 순수한 데이터 형태의 타입을 직접 정의
export interface PushSubscriptionProps {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}
