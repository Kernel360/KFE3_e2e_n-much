// 'use client';
// import { CHARGE_FILTER_CONFIG } from 'src/entities/user/mypage/constants';
// import ActivityTypeFilter from '../shared/points/ActivityTypeFilter';
// import DateRangeFilter from '../shared/points/DateRangeFilter';
// import { useState } from 'react';

// interface MyPointFiltersSectionProps {
//   onFiltersChange: (periodFilter: string, typeFilter: string) => void;
// }

// const MyPointFiltersSection = ({ onFiltersChange }: MyPointFiltersSectionProps) => {
//   const [periodFilter, setPeriodFilter] = useState('전체');
//   const [typeFilter, setTypeFilter] = useState('전체');

//   const handlePeriodChange = (filter: string) => {
//     setPeriodFilter(filter);
//     onFiltersChange(filter, typeFilter);
//   };

//   const handleTypeChange = (filter: string) => {
//     setTypeFilter(filter);
//     onFiltersChange(periodFilter, filter);
//   };

//   // 초기화 함수
//   const handleReset = () => {
//     setPeriodFilter('전체');
//     setTypeFilter('전체');
//     onFiltersChange('전체', '전체');
//   };

//   return (
//     <section className="mt-6">
//       <DateRangeFilter
//         availableFilters={CHARGE_FILTER_CONFIG.periodFilters}
//         activeFilter={periodFilter}
//         onFilterChange={handlePeriodChange}
//         onReset={handleReset}
//       />
//       <ActivityTypeFilter
//         availableFilters={CHARGE_FILTER_CONFIG.typeFilters}
//         activeFilter={typeFilter}
//         onFilterChange={handleTypeChange}
//       />
//     </section>
//   );
// };

// export default MyPointFiltersSection;
