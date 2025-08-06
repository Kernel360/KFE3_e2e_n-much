import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularKeywords } from 'src/entities/search/api';

const usePopularKeywords = () => {
  const {
    data: popularKeywords = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['popularKeywords'],
    queryFn: getPopularKeywords
  });

  useEffect(() => {
    if (isError && error) {
      console.error('인기 검색어 조회에 실패했습니다.:', error);
    }
  }, [isError, error]);

  return { popularKeywords, isLoading, isError, error };
};

export default usePopularKeywords;
