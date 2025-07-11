// import { twMerge } from 'tailwind-merge';
// import { FaCoins, FaCartShopping, FaGift, FaUserPlus, FaGavel } from 'react-icons/fa6';
// import type { PointRow } from 'src/shared/supabase/types';

// type ActivityItemProps = {
//   activity: PointRow;
//   size?: 'sm' | 'md';
// };

// const ActivityItem = ({ activity, size = 'sm' }: ActivityItemProps) => {
//   const { title, created_at, type } = activity;

//   const getIcon = (activityType: string) => {
//     switch (activityType) {
//       case 'charge':
//         return FaCoins;
//       case 'auction':
//         return FaGavel;
//       case 'purchase':
//         return FaCartShopping;
//       case 'event':
//         return FaGift;
//       case 'signup':
//         return FaUserPlus;
//       default:
//         return FaCoins;
//     }
//   };

//   // 사이즈별 스타일
//   const getSizeStyles = (size: string) => {
//     return size === 'md'
//       ? { container: 'w-12 h-12', icon: 'text-lg', gap: 'gap-3' }
//       : { container: 'w-8 h-8', icon: 'text-sm', gap: 'gap-2' };
//   };

//   const Icon = getIcon(type);
//   const styles = getSizeStyles(size);

//   // 삭제 예정 (임시)
//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return '날짜 없음';
//     return new Date(dateString).toLocaleDateString('ko-KR');
//   };

//   return (
//     <div className={twMerge('flex items-center', styles.gap)}>
//       <div
//         className={twMerge('bg-(--color-secondary) flex items-center justify-center rounded-full', styles.container)}
//       >
//         <Icon className={twMerge('text-(--color-accent)', styles.icon)} />
//       </div>
//       <div className="flex flex-col">
//         <h4 className="text-sm font-medium">{title}</h4>
//         <time className="text-(--color-warm-gray) text-xs">{formatDate(created_at)}</time>
//       </div>
//     </div>
//   );
// };

// export default ActivityItem;
