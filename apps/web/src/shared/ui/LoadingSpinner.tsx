import { LuLoaderCircle } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: Size;
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizeStyle = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8',
    xl: 'size-10'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <LuLoaderCircle className={twMerge('text-(--color-accent) animate-spin', sizeStyle[size], className)} />
    </div>
  );
};
