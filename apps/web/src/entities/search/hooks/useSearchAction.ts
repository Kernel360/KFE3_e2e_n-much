import { useState } from 'react';

const useSearchAction = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return {
    keyword,
    setKeyword,
    isLoading,
    setIsLoading
  };
};

export default useSearchAction;
