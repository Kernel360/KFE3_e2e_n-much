import type { ElementType, ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ListCardProps {
  as?: ElementType;
  href?: string;
  className?: string;
  children: ReactNode;
}

const ListCard = ({ as: el = 'div', href, className = '', children }: ListCardProps) => {
  const baseClass = 'rounded-xl bg-white p-4 shadow-sm';

  if (el === Link && href) {
    return (
      <Link href={href} className={twMerge(baseClass, className)}>
        {children}
      </Link>
    );
  }

  const Tag = el;
  return <Tag className={twMerge(baseClass, className)}>{children}</Tag>;
};

export default ListCard;
