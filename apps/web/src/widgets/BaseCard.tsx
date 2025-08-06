import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface BaseCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  href?: string;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'custom';
}

const BaseCard = ({ as: el = 'div', href, className = '', variant = 'default', children, ...props }: BaseCardProps) => {
  const baseClass = 'shadow-sm';

  const variantStyles = {
    default: 'rounded-xl bg-white p-4',
    primary: 'bg-(--color-secondary) w-full rounded-2xl p-5',
    custom: 'rounded-xl bg-white'
  };

  if (el === Link && href) {
    return (
      <Link href={href} className={twMerge(baseClass, variantStyles[variant], className)} {...props}>
        {children}
      </Link>
    );
  }

  const Tag = el;
  return (
    <Tag className={twMerge(baseClass, variantStyles[variant], className)} {...(href && { href })} {...props}>
      {children}
    </Tag>
  );
};

export default BaseCard;
