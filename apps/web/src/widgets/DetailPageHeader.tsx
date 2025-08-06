import type { ReactNode } from 'react';
import GoBackButton from 'src/shared/ui/GoBackButton';
import PageTitle from 'src/shared/ui/PageTitle';

interface DetailPageHeaderProps {
  children: ReactNode;
  fallbackUrl?: string;
}

const DetailPageHeader = ({ children, fallbackUrl }: DetailPageHeaderProps) => {
  return (
    <nav className="border-b-(--color-warm-gray)/30 relative flex items-center justify-between border-b bg-white p-4">
      <GoBackButton fallbackUrl={fallbackUrl} />
      <PageTitle className="w-full text-center text-xl font-semibold">{children}</PageTitle>
    </nav>
  );
};

export default DetailPageHeader;
