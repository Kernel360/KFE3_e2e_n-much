// import { STATUS_LABELS } from 'src/entities/user/mypage/constants';
// import { AuctionRow } from 'src/shared/supabase/types';
// import { AuctionStatus, TabKey } from 'src/entities/user/mypage/types/mypage/types';

// // 객체 매핑
// export const STATUS_LABEL_MAP: Record<string, keyof typeof STATUS_LABELS> = Object.entries(STATUS_LABELS).reduce(
//   (acc, [key, label]) => {
//     acc[label] = key as keyof typeof STATUS_LABELS;
//     return acc;
//   },
//   {} as Record<string, keyof typeof STATUS_LABELS>
// );

// export const filterByTabKey = (auctions: AuctionRow[], tab: TabKey): AuctionRow[] => {
//   if (tab === 'ongoing') {
//     // 진행 중인 경매 (OPEN 상태)
//     return auctions.filter((auction) => auction.status === 'OPEN');
//   } else {
//     // 종료된 경매 (CLOSED 상태)
//     return auctions.filter((auction) => auction.status === 'CLOSED');
//   }
// };

// export const filterByStatusLabel = <T extends { status: string }>(items: T[], filter: string): T[] => {
//   if (filter === '전체') return items;

//   const statusKey = STATUS_LABEL_MAP[filter] as AuctionStatus;
//   if (!statusKey) return items;

//   return items.filter((item) => item.status === statusKey);
// };
