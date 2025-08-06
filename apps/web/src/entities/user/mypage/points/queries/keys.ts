export const pointQueryKeys = {
  all: ['point'] as const,
  user: (userId: string) => [...pointQueryKeys.all, userId] as const
};
