import { ENDING_SOON_AUCTIONS_COUNT } from 'src/entities/auction/constants';
import { getAuctionsCategory } from 'src/entities/auction/serverActions';
import EndingSoonCarousel from 'src/features/auction/carousel/EndingSoonCarousel';
import AuctionSectionHeader from 'src/features/auction/shared/AuctionSectionHeader';
import EmptyState from 'src/shared/ui/EmptyState';

const EndingSoonListSection = async ({ from }: { from?: string }) => {
  const endingSoonAuctions = await getAuctionsCategory('end_date', true, ENDING_SOON_AUCTIONS_COUNT);

  if (!endingSoonAuctions || endingSoonAuctions.length === 0) {
    return (
      <EmptyState
        title="아직 등록된 상품 정보가 없어요."
        description="새로운 경매가 등록되면 알려드릴게요!"
        className="rounded-lg border bg-white py-16 shadow-sm"
      />
    );
  }

  return (
    <div>
      <AuctionSectionHeader title="곧 종료되는 경매" href={'/auctions?order=end_time'} />
      <EndingSoonCarousel endingSoonAuctions={endingSoonAuctions} from={from} />
    </div>
  );
};

export default EndingSoonListSection;
