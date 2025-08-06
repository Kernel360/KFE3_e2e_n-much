import { Skeleton } from '@repo/ui/components/ui/skeleton';

const EpisodeCardSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-9" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <div className="flex flex-col items-end justify-center"></div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-4 w-9" />
      </div>
    </div>
  );
};

export default EpisodeCardSkeleton;
