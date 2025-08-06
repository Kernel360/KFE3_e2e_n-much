import { Skeleton } from '@repo/ui/components/ui/skeleton';

const AddressStatusSkeleton = () => {
  return (
    <div className="border-(--color-warm-gray)/30 mt-3 border-t py-4">
      <div>
        <Skeleton className="mb-5 h-6 w-10" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="-translate-y-1">
          <div className="mb-1">
            <Skeleton className="w-30 h-5" />
          </div>
          <div>
            <Skeleton className="h-5 w-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressStatusSkeleton;
