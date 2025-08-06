'use client';

import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface RecentKeywordsProps {
  keywords: string[];
  handleKeywordClick: (keyword: string) => void;
  handleRemoveClick: (keyword: string) => void;
  handleClearClick: () => void;
  isMd: boolean;
}

const RecentKeywords = ({
  keywords,
  handleKeywordClick,
  handleRemoveClick,
  handleClearClick,
  isMd
}: RecentKeywordsProps) => {
  const RENDER_ITEM_LENTH = 2;
  const keywordsToRender = isMd ? keywords : keywords.slice(0, RENDER_ITEM_LENTH);

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3>최근 검색어</h3>
        <button className="text-(--color-warm-gray) p-0 text-xs" onClick={handleClearClick}>
          전체 삭제
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {keywordsToRender.length > 0 ? (
          keywordsToRender.map((k, idx) => (
            <div
              key={`recent-${k}-${idx}`}
              className="bg-(--color-secondary) flex cursor-pointer items-center rounded-full px-3 py-2"
              onClick={() => handleKeywordClick(k)}
            >
              <span className="flex-1 truncate text-sm">{k}</span>
              <button
                className="text-(--color-warm-gray) ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveClick(k);
                }}
              >
                <IoCloseOutline />
              </button>
            </div>
          ))
        ) : (
          <p className="text-(--color-light-gray) col-span-2 text-sm">최근 검색 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecentKeywords;
