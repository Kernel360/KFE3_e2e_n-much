export const episodeQueryKeys = {
  all: ['episode'] as const,
  user: (userId: string) => [...episodeQueryKeys.all, 'user', userId] as const,
  detail: (episodeId: string) => [...episodeQueryKeys.all, 'detail', episodeId] as const,
  biddingCount: () => [...episodeQueryKeys.all, 'biddingCount'] as const,
  userStories: () => [...episodeQueryKeys.all, 'userStories'] as const
};
