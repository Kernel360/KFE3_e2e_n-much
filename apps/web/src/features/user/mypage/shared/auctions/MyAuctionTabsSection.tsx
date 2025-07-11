// 'use client';
// import { Tabs } from '@repo/ui/components/ui/tabs';
// import MyTabsHeader from '../MyTabsHeader';
// import MyTabsContent from '../MyTabsContent';
// import MyAuctionListItem from './MyAuctionListItem';
// import { useState } from 'react';
// import { filterByTabKey } from 'src/features/user/utils/mypage/auctionFilters';
// import { TAB_LABELS } from 'src/entities/user/mypage/constants';
// import { useMyPageGetSellerAuctions } from 'src/features/user/queries/useAuctions';
// import type { TabKey } from 'src/features/user/mypage/types';
// import useSellerId from 'src/entities/auth/hooks/useSellerId';

// const MyAuctionTabsSection = () => {
//   const [tabValue, setTabValue] = useState<TabKey>('ongoing');
//   const seller_id = useSellerId();
//   const { data: sellerAuctions = [], isLoading } = useMyPageGetSellerAuctions(seller_id ?? '');
//   if (!seller_id || isLoading) {
//     return <div className="py-8 text-center text-gray-400">경매 목록 불러오는 중...</div>;
//   }

//   const filteredAuctions = filterByTabKey(sellerAuctions, tabValue);

//   const transformedAuctions = filteredAuctions.map((auction) => ({
//     ...auction,
//     id: auction.auction_id
//   }));

//   const handleTabChange = (value: string) => {
//     setTabValue(value as TabKey);
//   };

//   return (
//     <section>
//       <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
//         <MyTabsHeader tabLabels={TAB_LABELS} />
//         <MyTabsContent
//           tab={tabValue}
//           data={transformedAuctions}
//           renderItem={(item) => <MyAuctionListItem item={item} />}
//           itemClassName="mb-4"
//           emptyMessage={{
//             ongoing: '진행중인 경매가 없습니다.',
//             closed: '종료된 경매가 없습니다.'
//           }}
//         />
//       </Tabs>
//     </section>
//   );
// };

// export default MyAuctionTabsSection;
