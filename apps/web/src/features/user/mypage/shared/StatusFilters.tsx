// import { STORY_CONFIG } from 'src/entities/user/mypage/constants';
// import FilterListItem from './FilterListItem';
// import type { TabKey } from 'src/features/user/mypage/types';

// interface AuctionStatusFiltersProps {
//   tab: TabKey;
//   activeFilter: string;
//   onFilterChange: (filter: string) => void;
// }

// const StatusFilters = ({ tab, activeFilter, onFilterChange }: AuctionStatusFiltersProps) => {
//   const filters = STORY_CONFIG.tabFilters[tab];
//   const statusStyles = 'px-3 text-xs';

//   return (
//     <nav>
//       <ul className="flex items-center gap-2 py-2">
//         {filters.map((label) => (
//           <FilterListItem
//             key={label}
//             label={label}
//             isActive={activeFilter === label}
//             onClick={() => onFilterChange(label)}
//             className={statusStyles}
//           />
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default StatusFilters;
