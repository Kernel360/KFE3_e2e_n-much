// 'use client';
// import { useEffect, useState } from 'react';
// import { Tabs } from '@repo/ui/components/ui/tabs';
// import { TabKey } from 'src/features/user/mypage/types';
// import MyTabsHeader from '../shared/MyTabsHeader';
// import MyTabsContent from '../shared/MyTabsContent';
// import MyStoryListItem from './MyStoryListItem';
// import { useSearchParams } from 'next/navigation';
// import { useGetUserStories } from 'src/features/user/queries/useEpisodes';

// const MyStorySection = () => {
//   const searchParams = useSearchParams();
//   const [tabValue, setTabValue] = useState<TabKey>('ongoing');
//   const { data: userStories = [] } = useGetUserStories();

//   const TAB_LABELS = {
//     ongoing: '진행중',
//     closed: '종료됨'
//   };

//   useEffect(() => {
//     const urlTab = searchParams.get('tab') as TabKey;

//     if (urlTab && (urlTab === 'ongoing' || urlTab === 'closed')) {
//       setTabValue(urlTab);
//     }
//   }, [searchParams]);

//   const getFilteredStories = () => {
//     if (!userStories || userStories.length === 0) return [];

//     const cleanedStories = userStories.map((story) => ({
//       ...story,
//       status: story.status.replace(/['"]/g, '')
//     }));

//     // 탭별 필터링
//     if (tabValue === 'ongoing') {
//       return cleanedStories.filter(
//         (story) => story.status === 'bidding' || story.status === 'in_progress' || story.status === 'active'
//       );
//     } else {
//       return cleanedStories.filter(
//         (story) => story.status === 'completed' || story.status === 'cancelled' || story.status === 'finished'
//       );
//     }
//   };

//   const filteredStories = getFilteredStories();

//   const handleTabChange = (value: string) => {
//     setTabValue(value as TabKey);
//   };

//   return (
//     <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
//       <MyTabsHeader tabLabels={TAB_LABELS} />
//       <MyTabsContent
//         tab={tabValue}
//         data={filteredStories}
//         renderItem={(item) => <MyStoryListItem item={item} />}
//         itemClassName="group mb-4 flex cursor-pointer transition-colors duration-200 hover:bg-(--color-accent)/10"
//       />
//     </Tabs>
//   );
// };

// export default MyStorySection;
