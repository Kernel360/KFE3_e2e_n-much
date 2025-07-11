// import { TabKey } from 'src/features/user/mypage/types';

// export interface StoryItem {
//   id: string;
//   episode_id: string;
//   title: string;
//   status: string;
//   created_at: string;
//   auctions: {
//     title: string;
//   };
//   description: string;
// }

// export const filterStoryByTab = (stories: StoryItem[], tab: TabKey): StoryItem[] => {
//   if (tab === 'ongoing') {
//     return stories.filter((story) => story.status === 'bidding');
//   } else {
//     return stories.filter(
//       (story) => story.status === 'completed' || story.status === 'failed' || story.status === 'ended'
//     );
//   }
// };
