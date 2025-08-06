// 'use server';

// import webpush from 'web-push';
// import type { PushSubscriptionProps } from 'src/entities/notification/type';

// webpush.setVapidDetails(
//   'mailto:jepjepghost@gmail.com',
//   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   process.env.VAPID_PRIVATE_KEY!
// );

// // 데이터베이스 대신 임시로 구독 정보를 저장할 변수
// // 실제 프로덕션에서는 이 부분을 DB 로직으로 대체해야 합니다.
// let subscription: PushSubscriptionProps | null = null;

// export const subscribeUser = async (sub: PushSubscriptionProps) => {
//   subscription = sub;
//   console.log('🚀 ~ subscribeUser ~ subscription:', subscription);

//   return { success: true };
// };

// export const unsubscribeUser = async () => {
//   subscription = null;

//   return { success: true };
// };

// export const sendNotification = async (message: string) => {
//   if (!subscription) {
//     throw new Error('No subscription available');
//   }

//   try {
//     await webpush.sendNotification(
//       subscription,
//       JSON.stringify({
//         title: 'Test Notification',
//         body: message,
//         icon: '/web_app_manifest_192.png'
//       })
//     );
//     return { success: true };
//   } catch (error) {
//     console.error('Error sending push notification:', error);
//     return { success: false, error: 'Failed to send notification' };
//   }
// };
