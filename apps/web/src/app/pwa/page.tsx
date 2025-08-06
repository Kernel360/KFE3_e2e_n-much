// // Page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// // 서버 액션과 함께, 서버에서 정의한 타입도 가져옵니다.
// import {
//   subscribeUser,
//   unsubscribeUser,
//   sendNotification,
//   type SimplePushSubscription
// } from 'src/app/pwa/(actions)/actions';

// const urlBase64ToUint8Array = (base64String: string) => {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// };

// const PushNotificationManager = () => {
//   const [isSupported, setIsSupported] = useState(false);
//   // 클라이언트의 상태는 여전히 브라우저의 PushSubscription 객체를 유지합니다.
//   const [subscription, setSubscription] = useState<PushSubscription | null>(null);
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

//   useEffect(() => {
//     if ('serviceWorker' in navigator && 'PushManager' in window) {
//       const test = async () => {
//         if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
//           console.error('VAPID public key is not defined.');
//           return;
//         }
//         try {
//           const registration = await navigator.serviceWorker.ready;
//           const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
//           });

//           setSubscription(sub);

//           // *** 핵심 변경사항 ***
//           // 서버로 보내기 전에 .toJSON()을 호출하여 순수 데이터 객체로 변환
//           await subscribeUser(sub.toJSON() as SimplePushSubscription);
//           console.log('Subscribed to push notifications.');
//         } catch (error) {
//           console.error('Failed to subscribe to push notifications:', error);
//         }
//       };
//       setIsSupported(true);
//       test();
//     }
//   }, []);

//   // isSupported가 true가 되면 서비스워커 등록 및 구독 상태 확인
//   useEffect(() => {
//     if (isSupported) {
//       const init = async () => {
//         await registerServiceWorker();
//         const sub = await navigator.serviceWorker.ready.then((reg) => reg.pushManager.getSubscription());
//         setSubscription(sub);
//         setIsLoading(false);
//       };
//       init();
//     } else {
//       setIsLoading(false);
//     }
//   }, [isSupported]);

//   const registerServiceWorker = async () => {
//     try {
//       await navigator.serviceWorker.register('/sw.js', {
//         scope: '/'
//       });
//       console.log('Service Worker registered successfully.');
//     } catch (error) {
//       console.error('Service Worker registration failed:', error);
//     }
//   };

//   const subscribeToPush = async () => {
//     if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
//       console.error('VAPID public key is not defined.');
//       return;
//     }
//     try {
//       const registration = await navigator.serviceWorker.ready;

//       const sub = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
//       });

//       setSubscription(sub);

//       await subscribeUser(sub.toJSON() as SimplePushSubscription);
//       console.log('Subscribed to push notifications.');
//     } catch (error) {
//       // 알림 권한 차단 시 전달 되는 문구(추후 삭제 예정)
//       console.error('Failed to subscribe to push notifications:', error);
//     }
//   };

//   const unsubscribeFromPush = async () => {
//     if (!subscription) return;
//     try {
//       await subscription.unsubscribe();
//       setSubscription(null);
//       await unsubscribeUser();
//       console.log('Unsubscribed from push notifications.');
//     } catch (error) {
//       console.error('Failed to unsubscribe:', error);
//     }
//   };

//   const sendTestNotification = async () => {
//     if (!subscription) {
//       console.error('Not subscribed, cannot send notification.');
//       return;
//     }
//     try {
//       await sendNotification(message);
//       setMessage('');
//     } catch (error) {
//       console.error('Failed to send notification:', error);
//     }
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (!isSupported) {
//     return <p>Push notifications are not supported in this browser.</p>;
//   }

//   return (
//     <div>
//       <h3>Push Notifications</h3>
//       {subscription ? (
//         <>
//           <p>You are subscribed to push notifications.</p>
//           <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter notification message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={sendTestNotification}>Send Test</button>
//           </div>
//         </>
//       ) : (
//         <>
//           <p>You are not subscribed to push notifications.</p>
//           <button onClick={subscribeToPush}>Subscribe</button>
//         </>
//       )}
//     </div>
//   );
// };

// const InstallPrompt = () => {
//   const [isIOS, setIsIOS] = useState(false);
//   const [isStandalone, setIsStandalone] = useState(false);

//   useEffect(() => {
//     setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

//     setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
//   }, []);

//   if (isStandalone) {
//     return null; // Don't show install button if already installed
//   }

//   return (
//     <div>
//       <h3>Install App</h3>
//       <button>Add to Home Screen</button>
//       {isIOS && (
//         <p>
//           To install this app on your iOS device, tap the share button
//           <span role="img" aria-label="share icon">
//             {' '}
//             ⎋{' '}
//           </span>
//           and then "Add to Home Screen"
//           <span role="img" aria-label="plus icon">
//             {' '}
//             ➕{' '}
//           </span>
//           .
//         </p>
//       )}
//     </div>
//   );
// };

// const Page = () => {
//   return (
//     <div>
//       <PushNotificationManager />
//       <InstallPrompt />
//     </div>
//   );
// };

// export default Page;

import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
