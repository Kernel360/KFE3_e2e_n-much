import { Skeleton } from '@repo/ui/components/ui/skeleton';

const EpisodeItemSkeleton = () => (
  <li className="mb-4 rounded-xl bg-white p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-6 w-16" />
    </div>
    <Skeleton className="mb-3 h-4 w-32" />
    <div className="rounded-lg bg-gray-50 p-3">
      <Skeleton className="h-4 w-36" />
    </div>
  </li>
);

export default EpisodeItemSkeleton;
