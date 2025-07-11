// import Image from 'next/image';
// import LabelBadge from 'src/components/common/LabelBadge';
// import { Button } from '@repo/ui/components/ui/button';
// import { STATUS_LABELS, STATUS_VARIANTS } from 'src/entities/user/mypage/constants';
// import { formatNumber } from 'src/shared/utils/formatNumber';
// import type { MyAuctionListItemProps } from 'src/features/user/mypage/types';
// import { useRouter } from 'next/navigation';

// const MyAuctionListItem = ({ item }: MyAuctionListItemProps) => {
//   const { title, current_point, starting_point, end_time, status } = item;
//   const router = useRouter();

//   // status 관련 변수들
//   const statusVariant = STATUS_VARIANTS[status as keyof typeof STATUS_VARIANTS] || 'muted';
//   const statusLabel = STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status;

//   // 날짜 포맷팅 변수로 분리 (리팩토링 필요)
//   const formattedEndDate = end_time ? new Date(end_time).toLocaleDateString('ko-KR') : '미정';

//   return (
//     <div>
//       <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b pb-4">
//         <div className="size-26 overflow-hidden rounded-lg border">
//           {item.image_urls ? (
//             <Image
//               src={item.image_urls[0] || ''}
//               alt={title}
//               width={104}
//               height={104}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
//               이미지 없음
//             </div>
//           )}
//         </div>
//         <div className="flex-1">
//           <div className="mb-2 flex items-start justify-between">
//             <h3 className="line-clamp-1 font-medium">{title}</h3>
//             <LabelBadge status={status} variant={statusVariant}>
//               {statusLabel}
//             </LabelBadge>
//           </div>
//           <div className="mt-1 flex flex-col gap-0.5">
//             <p className="flex justify-between text-sm">
//               <span className="text-(--color-warm-gray)">최종 낙찰가</span>
//               <span>{formatNumber(current_point ?? 0)} 원</span>
//             </p>
//             <p className="flex items-baseline justify-between text-sm">
//               <span className="text-(--color-warm-gray)">내 최종 입찰가</span>
//               <span className="text-(--color-accent) text-base font-medium">
//                 {formatNumber(starting_point ?? 0)} 원
//               </span>
//             </p>
//             <p className="text-(--color-warm-gray) flex justify-between text-sm">
//               <span>경매 종료일</span>
//               <time>{formattedEndDate}</time>
//             </p>
//           </div>
//         </div>
//       </div>
//       <Button variant="base" className="mt-3 w-full" onClick={() => router.push(`/auctions/${item.auction_id}`)}>
//         상세보기
//       </Button>
//     </div>
//   );
// };

// export default MyAuctionListItem;
