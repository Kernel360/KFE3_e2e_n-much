import { twMerge } from 'tailwind-merge';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  const baseClasses = 'bg-[var(--color-background)] min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] px-5 pb-20 pt-8';

  return <main className={twMerge(baseClasses, className)}>{children}</main>;
};

export default PageContainer;
