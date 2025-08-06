import { Skeleton } from '@repo/ui/components/ui/skeleton';
import BaseCard from 'src/widgets/BaseCard';

const PointHistoryListItemSkeleton = () => {
  return (
    <BaseCard as="li" className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 pb-3 md:pb-0">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="border-t-(--color-warm-gray)/30 flex flex-col items-end gap-0.5 border-t pt-3 md:border-t-transparent md:pt-0">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </BaseCard>
  );
};

export default PointHistoryListItemSkeleton;
