import { type SortedAuctionsListProps, type SortedAuctionItemType } from 'src/entities/auction/types';
import LatestAuctionCard from 'src/features/auction/card/LatestAuctionCard';

const LatestAuctionList = ({ latestAuctions, from }: { latestAuctions: SortedAuctionsListProps; from?: string }) => {
  return (
    <ul className="overflow-hidden rounded-lg bg-white shadow-sm">
      {latestAuctions.map((auction: SortedAuctionItemType) => (
        <LatestAuctionCard key={auction.auction_id} auction={auction} from={from} />
      ))}
    </ul>
  );
};

export default LatestAuctionList;
