import GoBackButton from 'src/shared/GoBackButton';
import PageTitle from 'src/shared/PageTitle';

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <div className="border-b-(--color-warm-gray)/30 relative border-b py-5">
      <GoBackButton />
      <PageTitle>{children}</PageTitle>
    </div>
  );
};

export default PageHeader;
