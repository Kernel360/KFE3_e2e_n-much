import { twMerge } from 'tailwind-merge';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return (
    <main className={twMerge('min-h-[calc(100vh-4rem)] bg-(--color-background) px-5 pt-8 pb-20', className)}>
      {children}
    </main>
  );
};

export default PageContainer;
