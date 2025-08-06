import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContentDescriptionProps = {
  variant?: 'base' | 'ghost' | 'accent' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  clamp?: number;
  children: React.ReactNode;
};

const PageDescription = ({ size = 'sm', variant = 'base', clamp, className, children }: ContentDescriptionProps) => {
  const clampClass = clamp ? `line-clamp-${clamp}` : '';

  const variantClasses = {
    base: 'text-(--color-text-base)',
    ghost: 'text-(--color-warm-gray)',
    accent: 'text-(--color-accent)',
    primary: 'text-(--color-primary)'
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg'
  };

  return (
    <p
      className={twMerge(
        `whitespace-pre-line leading-relaxed ${variantClasses[variant]} ${clampClass} ${textSize[size]}`,
        className
      )}
    >
      {children}
    </p>
  );
};

export default PageDescription;
