import { Button } from '@repo/ui/components/ui/button';
import { twMerge } from 'tailwind-merge';

type Variant = 'ghost' | 'outline' | 'destructive' | 'base' | 'secondary' | 'active' | 'inActive' | 'text';

type MoreButtonProps = {
  onClick: () => void;
  variant: Variant;
  className?: string;
};

const MoreButton = ({ onClick, variant, className }: MoreButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={twMerge(`text-(--color-accent) cursor-pointer text-xs`, className)}
    >
      더보기
    </Button>
  );
};

export default MoreButton;
