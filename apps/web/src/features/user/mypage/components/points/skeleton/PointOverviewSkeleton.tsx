import { Skeleton } from '@repo/ui/components/ui/skeleton';
import BaseCard from 'src/widgets/BaseCard';

const PointOverviewSkeleton = () => {
  return (
    <BaseCard as="div" variant="custom" className="bg-(--color-warm-gray)/30 w-full py-5 text-center">
      <Skeleton className="mx-auto mb-2 h-4 w-24" />
      <Skeleton className="mx-auto h-8 w-32" />
    </BaseCard>
  );
};

export default PointOverviewSkeleton;
