import { Skeleton } from '@repo/ui/components/ui/skeleton';

const RoleSwitchSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={className}>
    <div className="bg-(--color-warm-gray) relative inline-flex h-10 w-44 translate-y-1 items-center rounded-full p-1 md:h-11 md:w-48">
      <div className="absolute top-1">
        <Skeleton className="!bg-(--color-warm-gray)/30 md:w-23 w-21 h-8 rounded-full md:h-9" />
      </div>
    </div>
  </div>
);

export default RoleSwitchSkeleton;
