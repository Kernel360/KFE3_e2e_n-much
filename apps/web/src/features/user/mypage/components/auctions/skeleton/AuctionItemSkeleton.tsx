import { Skeleton } from '@repo/ui/components/ui/skeleton';

const AuctionItemSkeleton = () => (
  <li className="mb-4 rounded-xl bg-white p-4 shadow-sm">
    <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b pb-4">
      <Skeleton className="size-26 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="mt-1 flex flex-col gap-0.5">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-18 h-4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
    <Skeleton className="mt-3 h-10 w-full" />
  </li>
);

export default AuctionItemSkeleton;
