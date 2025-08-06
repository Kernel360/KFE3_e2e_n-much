export const auctionQueryKeys = {
  all: ['auction'] as const,
  user: (userId: string) => [...auctionQueryKeys.all, 'user', userId] as const,
  favorite: (userId: string) => [...auctionQueryKeys.all, 'favorite', userId] as const
};
