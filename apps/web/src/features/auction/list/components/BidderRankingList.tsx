import { type BidderRankingInfoType } from 'src/entities/auction/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import ClientComponent from 'src/shared/ui/ClientContainer';
import PointDisplay from 'src/shared/ui/PointDisplay';
import { formatFullDateTime } from 'src/shared/utils/formatKoreanDate';
import { maskEmail } from 'src/shared/utils/maskEmail';

const BidderRankingList = ({ bidderRankingList }: { bidderRankingList: BidderRankingInfoType[] }) => {
  return (
    <ul className="space-y-4">
      {bidderRankingList.map((bidder, index) => (
        <li key={`${bidder.users.id}${index}`} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClientComponent>
              <BaseAvatar src={bidder.users.user_avatar!} alt={bidder.users.nick_name!} size="sm" />
            </ClientComponent>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">{bidder.users.nick_name}</p>
                <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(bidder.users.email)}&#41;</p>
              </div>
              <p className="text-(--color-warm-gray) text-xs">{formatFullDateTime(bidder.created_at)}</p>
            </div>
          </div>
          <p className="text-(--color-accent) font-bold">{<PointDisplay amount={bidder.bid_amount} />}</p>
        </li>
      ))}
    </ul>
  );
};

export default BidderRankingList;
