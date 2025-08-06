import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { twMerge } from 'tailwind-merge';

interface AuctionBaseCardSkeletonProps {
  className?: string;
}

const AuctionBaseCardSkeleton = ({ className = '' }: AuctionBaseCardSkeletonProps) => {
  return (
    <li className={twMerge(`overflow-hidden rounded-xl bg-white shadow-sm`, className)}>
      <div className="relative h-40 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-4/5 rounded" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-14" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default AuctionBaseCardSkeleton;
