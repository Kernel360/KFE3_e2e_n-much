'use client';

import PopularKeywordsSkeleton from 'src/features/search/components/PopularKeywordsSkeleton';

interface PopularKeywordsProps {
  keywords: string[];
  handleKeywordClick: (keyword: string) => void;
  isLoading?: boolean;
}

const PopularKeywords = ({ keywords, handleKeywordClick, isLoading }: PopularKeywordsProps) => {
  const LEFT_SLICE_COUNT = { start: 0, end: 5 };
  const RIGHT_SLICE_COUNT = { start: 5, end: 10 };
  const LEFT_RANK_START = 1;
  const RIGHT_RANK_START = LEFT_SLICE_COUNT.end;

  return (
    <div>
      <div className="mb-3 flex items-center">
        <h3>인기 검색어</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {isLoading ? (
          Array.from({ length: 10 }, (_, index) => index).map((index) => (
            <PopularKeywordsSkeleton className="h-6 w-full" key={`popular-${index}`} />
          ))
        ) : (
          <>
            <div className="flex w-full flex-col gap-2">
              {keywords.slice(LEFT_SLICE_COUNT.start, LEFT_SLICE_COUNT.end).map((keyword, idx) => (
                <div
                  key={`popular-${keyword}`}
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => handleKeywordClick(keyword)}
                >
                  <div className="flex items-center">
                    <span className="text-(--color-accent) size-6 font-medium">{idx + LEFT_RANK_START}</span>
                    <span className={`truncate text-sm ${isLoading && 'text-(--color-light-gray)'}`}>{keyword}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-2">
              {keywords.slice(RIGHT_SLICE_COUNT.start, RIGHT_SLICE_COUNT.end).map((keyword, idx) => (
                <div
                  key={`popular-${keyword}`}
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => handleKeywordClick(keyword)}
                >
                  <div className="flex items-center">
                    <span className="text-(--color-accent) size-6 font-medium">{idx + RIGHT_RANK_START}</span>
                    <span className={`truncate text-sm ${isLoading && 'text-(--color-light-gray)'}`}>{keyword}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularKeywords;
