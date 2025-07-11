export const pointQueryKeys = {
  all: ['point'] as const,
  transactions: () => [...pointQueryKeys.all, 'transactions'] as const
};
