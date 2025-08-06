import { type NextRequest, NextResponse } from 'next/server';
import { selectListEpisodeInfo } from 'src/entities/episode/supabase';
import { deleteUnsubscribeUser } from 'src/entities/notification/serverActions';
import { selectUserSubscriptionList } from 'src/entities/notification/supabase';
import webpush from 'web-push';
import type { PushSubscriptionProps } from 'src/entities/notification/type';
import type { AuctionRow } from 'src/shared/supabase/types';

export interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  schema: string;
  record: AuctionRow;
  old_record: AuctionRow;
}

export async function POST(req: NextRequest) {
  // VAPID 키 설정
  webpush.setVapidDetails(
    'mailto:jepjepghost@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  if (!process.env.VAPID_PRIVATE_KEY) {
    console.error('❌ VAPID_PRIVATE_KEY is undefined at build time');
    throw new Error('Missing VAPID_PRIVATE_KEY');
  }

  try {
    const body: WebhookPayload = await req.json();
    console.log('🚀 ~ POST ~ body:', body);
    const { record: currentAuctionInfo, old_record: prevAuctionInfo } = body;
    const auctionId = currentAuctionInfo.auction_id;
    const auctionTitle = currentAuctionInfo.title;

    // 상태(status)가 'OPEN' -> 'CLOSED'로 '변경'된 것이 맞는지 확인
    if (currentAuctionInfo.status !== 'CLOSED' || prevAuctionInfo.status === 'CLOSED') {
      console.log('🚀 POST ~ CLOSED');
      return NextResponse.json({ message: 'Event ignored: Not a new auction completion.' }, { status: 200 });
    }

    // 1. 사연 작성자 ID 목록 조회 ---
    const episodeUsers = await selectListEpisodeInfo(auctionId);
    const episodeUserIds: string[] = (episodeUsers ?? [])
      .map((user) => user.user_id)
      .filter((id): id is string => id !== null);
    console.log('🚀 ~ POST ~ episodeUserIds:', episodeUserIds);

    // 2. 알림 보낼 사용자 목록이 없으면 정상 종료
    if (!episodeUserIds || episodeUserIds.length === 0) {
      return NextResponse.json({ message: 'No users to notify.' }, { status: 200 });
    }

    // 3. 구독 정보 가져오기
    const subscriptions = await selectUserSubscriptionList(episodeUserIds);
    console.log('🚀 ~ POST ~ subscriptions:', subscriptions);

    // 푸시 알림 내용 생성
    const notificationPayload = JSON.stringify({
      title: '경매 종료 알림 🔔',
      body: `'${auctionTitle}' 경매가 마감되었습니다. 지금 결과를 확인하세요!`
    });

    // 4. 각 사용자에게 푸시 알림 발송
    for (const user of subscriptions ?? []) {
      // 1. 사용자 한 명의 구독 정보를 가져옵니다.
      const subs = user.subscription as unknown as PushSubscriptionProps[];
      console.log('🚀 ~ POST ~ subs:', subs);

      // 2. 구독 정보가 아예 없으면(null) 건너뜁니다.
      if (!subs) continue;

      // 3. 배열일 경우: 배열의 각 구독 정보에 대해 알림을 보냅니다.
      for (const sub of subs) {
        if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) continue;

        try {
          await webpush.sendNotification(sub, notificationPayload);
        } catch (err: any) {
          if (err.statusCode === 410 || err.statusCode === 404) {
            await deleteUnsubscribeUser(user.id, sub);
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('예외 발생:', e);
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
