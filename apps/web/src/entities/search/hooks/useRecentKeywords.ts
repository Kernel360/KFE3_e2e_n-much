import { useState, useEffect } from 'react';
import { LOCALSTORAGE_KEY } from 'src/entities/search/constants';

interface RecentKeywordsProps {
  getList: (params: { key: string }) => string[];
}

const useRecentKeywords = ({ getList }: RecentKeywordsProps) => {
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedvalueList = getList({ key: LOCALSTORAGE_KEY });
      setRecentKeywords(storedvalueList);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [getList]);

  return { recentKeywords, setRecentKeywords };
};

export default useRecentKeywords;
