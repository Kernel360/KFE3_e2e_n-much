import type { ReactNode } from 'react';
import { Badge } from '@repo/ui/components/ui/badge';
import { twMerge } from 'tailwind-merge';
import type { badgeVariants } from '@repo/ui/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

interface BaseBadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

const BaseBadge = ({ children, className = '', variant = 'primary', ...props }: BaseBadgeProps) => {
  const baseStyle = 'rounded-md px-2 ';

  return (
    <Badge variant={variant} className={twMerge(baseStyle, className)} {...props}>
      {children}
    </Badge>
  );
};

export default BaseBadge;
