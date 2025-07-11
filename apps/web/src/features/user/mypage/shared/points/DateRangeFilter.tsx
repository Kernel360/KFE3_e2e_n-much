// import { Button } from '@repo/ui/components/ui/button';
// import ListCard from 'src/components/common/ui/ListCard';

// interface DateRangeFilterProps {
//   availableFilters: string[];
//   activeFilter: string;
//   onFilterChange: (filter: string) => void;
//   onReset: () => void;
// }

// const DateRangeFilter = ({ availableFilters, activeFilter, onFilterChange, onReset }: DateRangeFilterProps) => {
//   return (
//     <div>
//       <div className="mb-3 flex items-center justify-between">
//         <h3 className="font-medium">기간별 필터</h3>
//         <Button variant="text" size="sm" className="text-(--color-accent)" onClick={onReset}>
//           초기화
//         </Button>
//       </div>
//       <nav>
//         <ListCard as="ul" className="flex h-auto w-full items-center justify-center space-x-1 p-2">
//           {availableFilters.map((filter) => (
//             <li key={filter} className="w-1/4">
//               <Button
//                 variant={activeFilter === filter ? 'active' : 'inActive'}
//                 className="w-full text-xs"
//                 onClick={() => onFilterChange(filter)}
//               >
//                 {filter}
//               </Button>
//             </li>
//           ))}
//         </ListCard>
//       </nav>
//     </div>
//   );
// };

// export default DateRangeFilter;
