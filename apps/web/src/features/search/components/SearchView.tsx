'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOCALSTORAGE_KEY, LOCALSTORAGE_MAX_LENGTH } from 'src/entities/search/constants';
import usePopularKeywords from 'src/entities/search/hooks/usePopularKeywords';
import { usePostKeywordMutation } from 'src/entities/search/hooks/usePostKeywordMutation';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';
import useSearchAction from 'src/entities/search/hooks/useSearchAction';
import PopularKeywords from 'src/features/search/components/PopularKeywords';
import RecentKeywords from 'src/features/search/components/RecentKeywords';
import SearchInput from 'src/features/search/components/SearchInput';
import { getList, pushItem, removeItem, removeList } from 'src/shared/utils/LocalStorageListUtil';
import { popToast } from 'src/shared/utils/popToast';

interface SearchViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchView = ({ open, setOpen }: SearchViewProps) => {
  const [isMd, setIsMd] = useState(false);
  const { keyword, setKeyword, isLoading: isSearchLoading, setIsLoading: setIsSerachLoading } = useSearchAction();
  const { recentKeywords, setRecentKeywords } = useRecentKeywords({ getList });
  const { popularKeywords, isLoading: isPopularLoading } = usePopularKeywords();

  const router = useRouter();

  const optimisticUpdate = (keyword: string) => {
    const previous = [...recentKeywords];
    const result = pushItem({
      key: LOCALSTORAGE_KEY,
      newValueItem: keyword,
      valueList: recentKeywords,
      maxLangth: LOCALSTORAGE_MAX_LENGTH
    });
    setRecentKeywords(result);
    return previous;
  };

  const rollback = (previous: string[]) => {
    setRecentKeywords(previous);
  };

  const postKeyword = usePostKeywordMutation(optimisticUpdate, rollback);

  const handleSearchClick = (searchKeyword: string) => {
    const trimmedKeyword = searchKeyword.trim();
    if (!trimmedKeyword) {
      popToast('warning', '검색 실패', '검색어를 입력해주세요.', 'medium');
      return;
    }

    setIsSerachLoading(true);

    router.push(`/auctions?keyword=${encodeURIComponent(trimmedKeyword)}`);
    setOpen(false);

    try {
      postKeyword.mutate({ keyword: trimmedKeyword });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setIsSerachLoading(false);
    }
  };

  const handleRemoveClick = (keyword: string) => {
    try {
      const result = removeItem({ key: LOCALSTORAGE_KEY, newValueItem: keyword, valueList: recentKeywords });
      setRecentKeywords(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleClearClick = () => {
    try {
      const result = removeList({ key: LOCALSTORAGE_KEY });
      setRecentKeywords(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    const mdQuery = window.matchMedia('(min-width: 768px)');
    setIsMd(mdQuery.matches);
  }, []);

  return (
    <section aria-label="검색" className="px-4 pb-8 pt-4">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearchClick={handleSearchClick}
        isFocused={open}
        isLoading={isSearchLoading}
      />
      <RecentKeywords
        keywords={recentKeywords}
        handleKeywordClick={handleSearchClick}
        handleRemoveClick={handleRemoveClick}
        handleClearClick={handleClearClick}
        isMd={isMd}
      />
      <PopularKeywords keywords={popularKeywords} handleKeywordClick={handleSearchClick} isLoading={isPopularLoading} />
    </section>
  );
};

export default SearchView;
