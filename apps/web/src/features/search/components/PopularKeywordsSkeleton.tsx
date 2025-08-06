import { Skeleton } from '@repo/ui/components/ui/skeleton';

const PopularKeywordsSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <Skeleton className={className} {...props} />;
};

export default PopularKeywordsSkeleton;
