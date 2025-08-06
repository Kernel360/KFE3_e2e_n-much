'use client';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import type { buttonVariants } from '@repo/ui/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

interface BackButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

const BackButton = ({ children, variant = 'active', className }: BackButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGoBack = () => {
    const from = searchParams.get('from');
    const tab = searchParams.get('tab');

    if (from && tab) {
      router.replace(`/${from}?tab=${tab}`);
    } else {
      router.back();
    }
  };

  return (
    <Button variant={variant} className={className} onClick={handleGoBack}>
      {children}
    </Button>
  );
};

export default BackButton;
