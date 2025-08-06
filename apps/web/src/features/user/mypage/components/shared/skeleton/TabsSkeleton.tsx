import { Skeleton } from '@repo/ui/components/ui/skeleton';

const TabsSkeleton = () => (
  <div className="relative mb-6 flex">
    <div className="after:bg-(--color-warm-gray) relative w-2/4 rounded-none pb-3 text-center after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5">
      <Skeleton className="w-15 mx-auto h-6" />
    </div>
    <div className="after:bg-(--color-warm-gray)/30 relative w-2/4 rounded-none pb-3 text-center after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px">
      <Skeleton className="w-15 mx-auto h-6" />
    </div>
  </div>
);

export default TabsSkeleton;
