// import { Button } from '@repo/ui/components/ui/button';
// import { MdFormatListBulleted } from 'react-icons/md';

// interface MyStoryFiltersProps {
//   availableFilters: string[];
//   activeFilter: string;
//   onFilterChange: (filter: string) => void;
// }

// const MyStoryFilters = ({ availableFilters, activeFilter, onFilterChange }: MyStoryFiltersProps) => {
//   return (
//     <nav>
//       <ul className="mt-3 flex gap-2">
//         {availableFilters.map((filterText) => (
//           <li key={filterText}>
//             <Button
//               variant={activeFilter === filterText ? 'active' : 'inActive'}
//               size="sm"
//               className="text-xs"
//               onClick={() => onFilterChange(filterText)}
//             >
//               {filterText === '전체' && <MdFormatListBulleted />}
//               {filterText}
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default MyStoryFilters;
