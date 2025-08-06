import { Skeleton } from '@repo/ui/components/ui/skeleton';

const AuctionLatestCardSkeleton = () => {
  return (
    <li className="py-3 last:py-0">
      <div className="flex items-center">
        {/* 이미지 썸네일 */}
        <div className="relative mr-3 size-20 flex-shrink-0">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        {/* 텍스트 영역 */}
        <div className="ml-2 flex-1 space-y-4">
          {/* 제목 + 뱃지 영역 */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-3/5 rounded" />
            <Skeleton className="h-5 w-10 rounded" />
          </div>

          {/* 메타 정보 */}
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default AuctionLatestCardSkeleton;
