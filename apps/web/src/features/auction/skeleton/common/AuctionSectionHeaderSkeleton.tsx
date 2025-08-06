import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { twMerge } from 'tailwind-merge';

const AuctionSectionHeaderSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge('mb-4 flex items-center justify-between', className)}>
      {/* Title skeleton */}
      <Skeleton className="h-6 w-[4.57rem] rounded" />
      {/* "더보기" skeleton */}
      <Skeleton className="h-4 w-12 rounded" />
    </div>
  );
};

export default AuctionSectionHeaderSkeleton;
