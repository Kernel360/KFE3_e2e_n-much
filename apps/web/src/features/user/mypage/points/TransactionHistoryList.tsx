// import ListCard from 'src/components/common/ui/ListCard';
// import PointSummary from '../shared/points/PointSummary';
// import ActivityItem from '../shared/ActivityItem';
// import { PointRow } from 'src/shared/supabase/types';

// interface TransactionHistoryListProps {
//   activities: PointRow[];
// }

// const TransactionHistoryList = ({ activities }: TransactionHistoryListProps) => {
//   if (activities.length === 0) {
//     return (
//       <div className="flex min-h-[200px] w-full items-center justify-center">
//         <div className="text-center">
//           <p className="text-lg font-medium">거래 내역이 없습니다.</p>
//           <p className="mt-1 text-sm">선택한 조건에 맞는 거래 내역을 찾을 수 없어요.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ul className="space-y-3">
//       {activities.map((activity, idx) => (
//         <ListCard key={idx} as="li" className="flex items-center justify-between">
//           <ActivityItem activity={activity} size="md" />
//           {'amount' in activity ? <PointSummary amount={activity.amount} balance={2730} /> : null}
//         </ListCard>
//       ))}
//     </ul>
//   );
// };

// export default TransactionHistoryList;
