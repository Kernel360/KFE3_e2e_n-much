// import ActivityListItem from './ActivityListItem';
// import type { PointRow } from 'src/shared/supabase/types';

// type ActivityWithStatus = PointRow & {
//   status?: 'OPEN' | 'CLOSED';
// };

// //삭제 에정
// export const activities: ActivityWithStatus[] = [
//   {
//     type: 'auction',
//     title: '빈티지 카메라 경매',
//     created_at: '2025-06-23T00:00:00.000Z',
//     amount: 0,
//     balance: 5000,
//     description: '경매 참여',
//     transaction_id: 'txn_001',
//     user_id: 'user_001',
//     status: 'OPEN'
//   },
//   {
//     type: 'charge',
//     title: '포인트 충전',
//     created_at: '2025-06-22T00:00:00.000Z',
//     amount: 3000,
//     balance: 5000,
//     description: '포인트 충전',
//     transaction_id: 'txn_002',
//     user_id: 'user_001'
//   },
//   {
//     type: 'event',
//     title: '이벤트 보상',
//     created_at: '2025-06-21T00:00:00.000Z',
//     amount: 500,
//     balance: 2000,
//     description: '이벤트 참여 보상',
//     transaction_id: 'txn_003',
//     user_id: 'user_001'
//   },
//   {
//     type: 'event',
//     title: '이벤트 참여',
//     created_at: '2025-06-20T00:00:00.000Z',
//     amount: -300,
//     balance: 1500,
//     description: '이벤트 참여비',
//     transaction_id: 'txn_004',
//     user_id: 'user_001'
//   },
//   {
//     type: 'signup',
//     title: '회원가입 포인트 지급',
//     created_at: '2025-06-19T00:00:00.000Z',
//     amount: 1000,
//     balance: 1800,
//     description: '회원가입 축하 포인트',
//     transaction_id: 'txn_005',
//     user_id: 'user_001'
//   },
//   {
//     type: 'auction',
//     title: '빈티지 시계 경매',
//     created_at: '2025-06-18T00:00:00.000Z',
//     amount: 0,
//     balance: 800,
//     description: '경매 대기',
//     transaction_id: 'txn_006',
//     user_id: 'user_001',
//     status: 'CLOSED'
//   },
//   {
//     type: 'purchase',
//     title: '포인트 사용',
//     created_at: '2025-06-17T00:00:00.000Z',
//     amount: -1500,
//     balance: 800,
//     description: '상품 구매',
//     transaction_id: 'txn_007',
//     user_id: 'user_001'
//   }
// ];

// const ActivityList = () => {
//   const recent = activities.slice(0, 5); // 최신순 5개만

//   return (
//     <section className="mt-6">
//       <h3 className="mb-3 font-medium">최근 활동</h3>
//       <ul className="rounded-xl bg-white p-4 shadow-sm">
//         {recent.map((activity, index) => (
//           <ActivityListItem key={index} activity={activity} />
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default ActivityList;
