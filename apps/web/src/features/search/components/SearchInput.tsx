'use client';
import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handleSearchClick: (keyword: string) => void;
  isFocused?: boolean;
  isLoading?: boolean;
}

const MOBILE_WIDTH = 768;

const SearchInput = ({
  keyword,
  setKeyword,
  handleSearchClick,
  isFocused = false,
  isLoading = false
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 데스크탑에서만 포커스 적용 (768px 이상)
    if (isFocused && window.innerWidth >= MOBILE_WIDTH) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <form
      className="relative mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchClick(keyword);
      }}
    >
      <input
        type="text"
        className="placeholder:text-muted-foreground border-(--color-light-gray) bg-(--color-secondary) focus:border-(--color-accent) focus:ring-(--color-accent) peer flex h-12 w-full rounded-lg border px-3 py-1 pr-9 text-sm shadow-none transition-colors focus:outline-none focus:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="검색어를 입력하세요"
        value={keyword || ''}
        onChange={(e) => setKeyword(e.target.value)}
        ref={inputRef}
        disabled={isLoading}
      />
      <button
        className="text-(--color-warm-gray) peer-focus:text-(--color-accent) absolute right-3 top-1/2 -translate-y-1/2 transform disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        aria-label="검색"
        disabled={isLoading}
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
