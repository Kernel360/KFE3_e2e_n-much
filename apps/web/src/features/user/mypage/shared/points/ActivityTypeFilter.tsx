// import { FaCoins, FaCartShopping } from 'react-icons/fa6';
// import { MdFormatListBulleted } from 'react-icons/md';
// import { Button } from '@repo/ui/components/ui/button';
// import SectionHeader from 'src/components/common/ui/SectionHeader';

// interface ActivityTypeFilterProps {
//   availableFilters: string[];
//   activeFilter: string;
//   onFilterChange: (filter: string) => void;
// }

// const ActivityTypeFilter = ({ availableFilters, activeFilter, onFilterChange }: ActivityTypeFilterProps) => {

//   const getIcon = (filterText: string) => {
//     switch (filterText) {
//       case '전체':
//         return <MdFormatListBulleted />;
//       case '충전':
//         return <FaCoins className="size-3" />;
//       case '사용':
//         return <FaCartShopping className="size-3" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mt-6">
//       <SectionHeader className="mb-3">유형별 필터</SectionHeader>
//       <nav>
//         <ul className="flex items-center gap-2">
//           {availableFilters.map((filter) => (
//             <li key={filter}>
//               <Button
//                 variant={activeFilter === filter ? 'active' : 'inActive'}
//                 size="sm"
//                 className="text-xs"
//                 onClick={() => onFilterChange(filter)}
//               >
//                 {getIcon(filter)}
//                 <span>{filter}</span>
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default ActivityTypeFilter;
