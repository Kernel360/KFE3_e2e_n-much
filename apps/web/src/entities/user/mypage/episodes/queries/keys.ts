export const episodeQueryKeys = {
  all: ['episode'] as const,
  user: (userId: string) => [...episodeQueryKeys.all, 'user', userId] as const,
  userLikes: (userId: string) => [...episodeQueryKeys.all, 'user', userId, 'likes'] as const
};
