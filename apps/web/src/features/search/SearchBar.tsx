'use client';
import React, { useState } from 'react';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';
import usePopularKeywords from 'src/entities/search/hooks/usePopularKeywords';
import { useAuctionsStore } from 'src/entities/auction/stores/AuctionsStore';
import { getAuctionsByKeyword } from 'src/entities/auction/supabase';
import { Button } from '@repo/ui/components/ui/button';
import { IoCloseOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
// import { FaCaretUp } from 'react-icons/fa';
// import { FaCaretDown } from 'react-icons/fa';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const { setAuctions } = useAuctionsStore();

  // 최근 검색어 커스텀 훅
  const { recentKeywords, insert, remove, clear } = useRecentKeywords();
  // 인기 검색어 커스텀 훅
  const { popularKeywords } = usePopularKeywords();

  const colCount = 2;
  const rowCount = Math.ceil(popularKeywords.length / colCount);

  const verticalOrdered = [];
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const idx = row + col * rowCount;
      if (popularKeywords[idx]) verticalOrdered.push(popularKeywords[idx]);
    }
  }

  const handleSearchByKeyword = async (paramKeyword: string) => {
    // 공백으로 인한 버그 막기(로컬스토리지에는 공백 포함해서 저장된 keyword가 UI에서는 공백 없이 보여짐, 중복 발생)
    const trimmedKeyword = paramKeyword.trim();
    if (!trimmedKeyword) return;
    const newActions = await getAuctionsByKeyword(trimmedKeyword);
    // DB에서 가져온 검색 결과를 store에 저장
    setAuctions(newActions);
    // 최근 검색어 추가
    insert(trimmedKeyword);
    setKeyword('');
  };

  const handleSearchByRecentKeyword = (e: React.MouseEvent<HTMLDivElement>, paramKeyword: string) => {
    setKeyword(paramKeyword);
    handleSearchByKeyword(paramKeyword);
  };

  const handleRemoveKeyword = (e: React.MouseEvent<HTMLButtonElement>, paramKeyword: string) => {
    e.stopPropagation();
    remove(paramKeyword);
  };

  return (
    // 임시 모달
    <div className="fixed right-0 bottom-16 left-0 z-50 m-auto max-w-2xl bg-white">
      {/* 여기서부터 모달에 보내는 영역 */}
      <div data-role="search_box" className="p-4">
        <div data-role="input_section" className="mb-6">
          <div className="relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchByKeyword(keyword);
              }}
            >
              <input
                type="text"
                className="peer placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-lg border border-[#C6C7D1] bg-[#EEF2FB] px-3 py-1 pr-9 text-sm shadow-none transition-colors focus:ring-1 focus:ring-[#5B80C2] focus:outline-none focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="검색어를 입력하세요"
                value={keyword || ''}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[#B8B8B8] peer-focus:text-[#5B80C2]"
                type="submit"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div data-role="recent_keywords_section" className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-medium">최근 검색어</h3>
            <Button className="p-0 text-xs text-[#B8B8B8]" variant="ghost" onClick={clear}>
              전체 삭제
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recentKeywords.length > 0 &&
              recentKeywords.map((k, idx) => {
                return (
                  <div
                    key={`recent-${k}-${idx}`}
                    className="flex cursor-pointer items-center rounded-full bg-[#EEF2FB] px-3 py-2"
                    onClick={(e) => handleSearchByRecentKeyword(e, k)}
                  >
                    <span className="flex-1 truncate text-sm">{k}</span>
                    <button className="ml-1 text-[#B8B8B8]" onClick={(e) => handleRemoveKeyword(e, k)}>
                      <IoCloseOutline />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        {/* DB 테이블 추가 필요 */}
        {/* 
        <div data-role="popular_keywords_section">
          <h3 className="mb-3 text-base font-medium">인기 검색어</h3>
          <div className="grid grid-cols-2 gap-2">
            {popularKeywords.length > 0 &&
              popularKeywords.map((k, idx) => {
                return (
                  <div key={`popular-${k}-${idx}`} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 font-medium text-[#5B80C2]">{k.rank}</span>
                      <span className="text-sm">{k.keyword}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCaretUp className="mr-1 text-[#65BA84]" />
                      <FaCaretDown className="text-[#D84A5F]" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
         */}
      </div>
    </div>
  );
};

export default SearchBar;
