import { Skeleton } from '@repo/ui/components/ui/skeleton';

const AuctionPopularCardSkeleton = () => {
  return (
    <li className="relative h-[13.75rem] w-full transform overflow-hidden rounded-lg duration-500">
      {/* 이미지 영역 */}
      <Skeleton className="absolute h-full w-full" />
      {/* 그라디언트 오버레이 */}
      <div className="absolute rounded-lg" />

      {/* 텍스트 영역 */}
      <div className="absolute bottom-0 left-0 w-full space-y-2 p-3">
        {/* 제목 */}
        <Skeleton className="h-4 w-3/4 rounded" />
        {/* 메타 정보 */}
        <div className="flex gap-3">
          <Skeleton className="h-4 w-8 rounded bg-black/10" />
          <Skeleton className="h-4 w-8 rounded bg-black/10" />
        </div>
      </div>
    </li>
  );
};
export default AuctionPopularCardSkeleton;
