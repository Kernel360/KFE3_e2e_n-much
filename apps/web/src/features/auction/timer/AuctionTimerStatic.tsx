import { IoTime } from 'react-icons/io5';
import AuctionTimer from 'src/features/auction/shared/AuctionTimer';
import { type AuctionRow } from 'src/shared/supabase/types';
import { formatRemainingTime } from 'src/shared/utils/formatRemainingTime';

const AuctionTimerStatic = ({ endDate }: { endDate: AuctionRow['end_date'] }) => {
  const { status, formattedTime } = formatRemainingTime(endDate);

  return (
    <AuctionTimer remainTime={formattedTime} status={status}>
      <IoTime />
      <span>남은 시간:</span>
    </AuctionTimer>
  );
};

export default AuctionTimerStatic;
