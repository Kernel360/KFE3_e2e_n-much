import { LATEST_AUCTIONS_COUNT } from 'src/entities/auction/constants';
import { getAuctionsCategory } from 'src/entities/auction/serverActions';
import LatestAuctionList from 'src/features/auction/list/components/LatestAuctionList';
import AuctionSectionHeader from 'src/features/auction/shared/AuctionSectionHeader';
import EmptyState from 'src/shared/ui/EmptyState';

const LatestListSection = async ({ from }: { from?: string }) => {
  const latestAuctions = await getAuctionsCategory('created_at', true, LATEST_AUCTIONS_COUNT);

  if (!latestAuctions || latestAuctions.length === 0) {
    return (
      <EmptyState
        title="아직 등록된 상품 정보가 없어요."
        description="새로운 정보가 등록되면 알려드릴게요!"
        className="mt-8 rounded-lg border bg-white py-16 shadow-sm"
      />
    );
  }

  return (
    <div className="mt-8">
      <AuctionSectionHeader title="최신 경매" href={'/auctions?order=created_at'} />
      <LatestAuctionList latestAuctions={latestAuctions} from={from} />
    </div>
  );
};

export default LatestListSection;
