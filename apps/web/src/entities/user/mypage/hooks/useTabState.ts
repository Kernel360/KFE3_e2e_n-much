'use client';

import { useSearchParams } from 'next/navigation';

interface UseTabStateProps {
  defaultTab?: string;
}

const useTabState = ({ defaultTab = 'open' }: UseTabStateProps) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || defaultTab;

  return { currentTab };
};

export { useTabState };
