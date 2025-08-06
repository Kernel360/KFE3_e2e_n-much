//ANCHOR - 사용자 지정 이미지와 알림을 지원하며, 수신되는 푸시 이벤트와 알림 클릭을 처리

// 사용자의 브라우저가 서버로부터 푸시 알림을 수신할 때 실행
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body,
      icon: data.icon || '/web_app_manifest_192.png',
      badge: '/web_app_manifest_192.png',
      vibrate: [100, 50, 100],
      data: {
        type: 'auction',
        auctionId: 456,
        userId: 'u123'
      }
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

//ANCHOR - 사용자가 푸시 알림을 클릭했을 때 앱을 열거나 특정 URL로 이동시키는 이벤트
self.addEventListener('notificationclick', function (event) {
  const data = event.notification.data;

  event.notification.close();
  event.waitUntil(clients.openWindow('https://kfe-3-e2e-n-much-web.vercel.app'));
});
