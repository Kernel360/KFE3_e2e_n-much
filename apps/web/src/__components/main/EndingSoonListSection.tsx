import { fetchSortedAuctions } from 'src/entities/auction/serverActions';
import EndingSoonCarousel from './EndingSoonCarousel';
import Link from 'next/link';
import PageTitle from '../../shared/ui/PageTitle';

const EndingSoonListSection = async () => {
  const endingSoonAuctions = await fetchSortedAuctions('end_time', true, 5);

  if (!endingSoonAuctions || endingSoonAuctions.length === 0) {
    return (
      <div className="h-50 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500">
        아직 등록된 정보가 없어요
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <PageTitle>곧 종료되는 경매</PageTitle>
        <Link href="/auctions?order=end_time" className="text-(--color-accent) cursor-pointer text-sm">
          더보기
        </Link>
      </div>
      <EndingSoonCarousel endingSoonAuctions={endingSoonAuctions} />
    </div>
  );
};

export default EndingSoonListSection;
