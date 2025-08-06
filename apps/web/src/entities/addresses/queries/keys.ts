export const addressQueryKeys = {
  all: ['addresses'] as const,
  list: (userId: string) => [...addressQueryKeys.all, 'list', userId] as const,
  default: (userId: string) => [...addressQueryKeys.all, 'default', userId] as const
};
