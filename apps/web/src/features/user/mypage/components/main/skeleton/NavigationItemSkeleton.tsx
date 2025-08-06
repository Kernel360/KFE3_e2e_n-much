import { Skeleton } from '@repo/ui/components/ui/skeleton';
import BaseCard from 'src/widgets/BaseCard';

const NavigationItemSkeleton = () => (
  <li>
    <div className="flex items-center">
      <BaseCard className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="size-4" />
      </BaseCard>
    </div>
  </li>
);

export default NavigationItemSkeleton;
