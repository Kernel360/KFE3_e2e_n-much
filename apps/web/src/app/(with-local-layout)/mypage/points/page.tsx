// 'use client';
// import { useState } from 'react';
// import PageHeader from 'src/components/common/ui/PageHeader';
// import SectionHeader from 'src/components/common/ui/SectionHeader';
// import PageContainer from 'src/components/layout/PageContainer';
// import SectionCard from 'src/components/common/ui/SectionCard';
// import TransactionSection from 'src/components/mypage/points/TransactionSection';
// import MyPointFiltersSection from 'src/components/mypage/points/MyPointFiltersSection';
// import PointOverview from 'src/components/mypage/shared/points/PointOverview';
// import { filterActivities } from 'src/entities/user/mypage/utils/pointFilters';
// import { useGetUserPointTransactions } from 'src/features/user/queries/usePoints';

// const MyPoints = () => {
//   const [periodFilter, setPeriodFilter] = useState('전체');
//   const [typeFilter, setTypeFilter] = useState('전체');

//   const { data: pointTransactions = [] } = useGetUserPointTransactions();

//   const filteredActivities = filterActivities(pointTransactions, periodFilter, typeFilter);

//   const handleFiltersChange = (period: string, type: string) => {
//     setPeriodFilter(period);
//     setTypeFilter(type);
//   };

//   return (
//     <>
//       <PageHeader>포인트 사용 내역</PageHeader>
//       <PageContainer>
//         <SectionCard className="flex flex-col items-center">
//           <SectionHeader className="mb-1 text-sm font-normal">현재 보유 포인트</SectionHeader>
//           <PointOverview />
//         </SectionCard>
//         <MyPointFiltersSection onFiltersChange={handleFiltersChange} />
//         <TransactionSection activities={filteredActivities} />
//       </PageContainer>
//     </>
//   );
// };

// export default MyPoints;
