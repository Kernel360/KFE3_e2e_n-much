import { Card } from '@repo/ui/components/ui/card';
import { FaRankingStar } from 'react-icons/fa6';
import { getBidderRanking } from 'src/entities/auction/api';
import BidderRankingList from 'src/features/auction/list/components/BidderRankingList';
import BidEmpty from 'src/features/auction/shared/BidEmpty';
import PageTitle from 'src/shared/ui/PageTitle';
import type { AuctionRow } from 'src/shared/supabase/types';

const BidderRankingInfoSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const bidderRankings = await getBidderRanking(auctionId);
  const isBidder = bidderRankings && bidderRankings.length > 0;

  return (
    <Card className="mb-4 p-5">
      <div className="mb-4 flex items-center gap-2">
        <FaRankingStar className="text-(--color-primary) size-8" />
        <PageTitle className="font-medium" size="md" order="left">
          입찰 랭킹
        </PageTitle>
      </div>
      {isBidder ? <BidderRankingList bidderRankingList={bidderRankings} /> : <BidEmpty />}
    </Card>
  );
};

export default BidderRankingInfoSection;
