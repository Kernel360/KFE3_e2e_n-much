import { create } from 'zustand';

type EpisodePaginationType = {
  currentPage: number;
  actions: {
    setCurrentPage: (newPage: number) => void;
  };
};

const usePaginationStore = create<EpisodePaginationType>((set) => ({
  currentPage: 1,
  actions: {
    setCurrentPage: (newPage) => set({ currentPage: newPage })
  }
}));

export const usePageState = () => usePaginationStore((state) => state.currentPage);
export const usePageActions = () => usePaginationStore((state) => state.actions);
