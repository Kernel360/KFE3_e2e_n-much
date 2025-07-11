export const userQueryKeys = {
  all: ['user'] as const,
  detail: (userId: string) => [...userQueryKeys.all, 'detail', userId] as const,
  role: () => [...userQueryKeys.all, 'role'] as const,
  info: () => [...userQueryKeys.all, 'info'] as const
};
