import Link from 'next/link';
import PageTitle from 'src/shared/ui/PageTitle';
import { twMerge } from 'tailwind-merge';

type AuctionSectionHeaderType = {
  title: string;
  href: string;
  className?: string;
};

const AuctionSectionHeader = ({ title, href, className }: AuctionSectionHeaderType) => {
  return (
    <>
      <div className={twMerge('mb-4 flex items-center justify-between', className)}>
        <PageTitle>{title}</PageTitle>
        <Link href={href} prefetch={true} className="text-(--color-accent) cursor-pointer text-sm">
          더보기
        </Link>
      </div>
    </>
  );
};

export default AuctionSectionHeader;
