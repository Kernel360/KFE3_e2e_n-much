// import { TabsContent } from '@repo/ui/components/ui/tabs';
// import ListCard from 'src/components/common/ui/ListCard';
// import type { TabKey } from 'src/features/user/mypage/types';

// interface MyTabsContentProps<T extends { id: string | number }> {
//   tab: TabKey;
//   data: T[];
//   renderItem: (item: T) => React.ReactNode;
//   itemClassName?: string;
//   emptyMessage?: {
//     ongoing: string;
//     closed: string;
//   };
// }

// const MyTabsContent = <T extends { id: string | number; status: string }>({
//   tab,
//   data,
//   renderItem,
//   itemClassName = '',
//   emptyMessage
// }: MyTabsContentProps<T>) => {
//   if (!data) return null;

//   const defaultEmptyMessage = {
//     ongoing: '진행중인 항목이 없습니다.',
//     closed: '종료된 항목이 없습니다.'
//   };

//   const messages = emptyMessage || defaultEmptyMessage;

//   return (
//     <TabsContent value={tab} className="mt-4">
//       {data.length > 0 ? (
//         <ul>
//           {data.map((item) => (
//             <ListCard as="li" key={item.id} className={itemClassName}>
//               {renderItem(item)}
//             </ListCard>
//           ))}
//         </ul>
//       ) : (
//         <div className="text-semibold flex min-h-[30dvh] w-full items-center justify-center">
//           {tab === 'ongoing' ? messages.ongoing : messages.closed}
//         </div>
//       )}
//     </TabsContent>
//   );
// };

// export default MyTabsContent;
