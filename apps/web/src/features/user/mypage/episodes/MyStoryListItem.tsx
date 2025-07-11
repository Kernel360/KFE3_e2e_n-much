// import { FaChevronRight, FaGavel } from 'react-icons/fa6';
// import { Badge } from '@repo/ui/components/ui/badge';
// import type { StoryItem } from 'src/features/user/utils/mypage/storyFilters';

// interface MyStoryListItemProps {
//   item: StoryItem;
// }

// const MyStoryListItem = ({ item }: MyStoryListItemProps) => {
//   const { title, created_at, status, auctions } = item;

//   // 상태별 Badge variant
//   const getVariant = (status: string) => {
//     switch (status) {
//       case 'bidding':
//         return 'warning';
//       case 'completed':
//         return 'success';
//       case 'failed':
//         return 'error';
//       case 'ended':
//         return 'muted';
//       default:
//         return 'muted';
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case 'bidding':
//         return '입찰중';
//       case 'completed':
//         return '낙찰완료';
//       case 'failed':
//         return '유찰';
//       case 'ended':
//         return '종료됨';
//       default:
//         return status;
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-1 flex-col gap-1">
//         <div className="flex items-center justify-between">
//           <h3 className="text-base font-medium">{title}</h3>
//           <Badge variant={getVariant(status)}>{getStatusText(status)}</Badge>
//         </div>
//         <p className="text-(--color-warm-gray) text-sm">작성일: {new Date(created_at).toLocaleDateString('ko-KR')}</p>
//         <div className="bg-(--color-secondary) group-hover:bg-(--color-accent)/30 mt-2 rounded-lg p-3 transition-colors duration-200">
//           <p className="text-(--color-accent) flex items-center gap-2 text-sm transition-all duration-200 group-hover:text-white">
//             <FaGavel />
//             <span>{auctions.title}</span> {/* prize 대신 auctions.title */}
//           </p>
//         </div>
//       </div>
//       <FaChevronRight className="text-(--color-warm-gray) ml-3 mt-1" />
//     </>
//   );
// };

// export default MyStoryListItem;
