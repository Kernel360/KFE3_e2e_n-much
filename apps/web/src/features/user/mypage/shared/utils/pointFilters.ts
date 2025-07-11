// import type { PointRow } from 'src/shared/supabase/types';

// export const filterByPeriod = (transactions: PointRow[], period: string): PointRow[] => {
//   if (period === '전체') return transactions;

//   const now = new Date();
//   let startDate: Date;

//   switch (period) {
//     case '1개월':
//       startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//       break;
//     case '3개월':
//       startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
//       break;
//     case '6개월':
//       startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
//       break;
//     default:
//       return transactions;
//   }

//   return transactions.filter((transaction) => {
//     try {
//       if (!transaction.created_at) return false;

//       const transactionDate = new Date(transaction.created_at);

//       // 유효한 날짜인지 확인
//       if (isNaN(transactionDate.getTime())) return false;

//       return transactionDate >= startDate;
//     } catch (error) {
//       console.warn('날짜 파싱 에러:', transaction.created_at, error);
//       return false; // 에러 시 제외
//     }
//   });
// };

// export const filterByType = (transactions: PointRow[], type: string): PointRow[] => {
//   if (type === '전체') return transactions;

//   if (type === '충전') {
//     return transactions.filter(
//       (transaction) => transaction.type === 'charge' || transaction.type === 'signup' || transaction.type === 'event'
//     );
//   }

//   if (type === '사용') {
//     return transactions.filter((transaction) => transaction.type === 'auction' || transaction.type === 'purchase');
//   }

//   return transactions;
// };

// export const filterActivities = (transactions: PointRow[], periodFilter: string, typeFilter: string): PointRow[] => {
//   let filtered = transactions;

//   // 기간별 필터링
//   filtered = filterByPeriod(filtered, periodFilter);

//   // 유형별 필터링
//   filtered = filterByType(filtered, typeFilter);

//   return filtered;
// };
