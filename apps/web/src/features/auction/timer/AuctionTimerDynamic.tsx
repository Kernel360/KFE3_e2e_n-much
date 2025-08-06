'use client';

import { IoTime } from 'react-icons/io5';
import { useTimer } from 'src/entities/auction/hooks/useTimer';
import { type AuctionTimerStatus } from 'src/entities/auction/types';
import AuctionTimer from 'src/features/auction/shared/AuctionTimer';
import { type AuctionRow } from 'src/shared/supabase/types';
import ClosedAuctionOverlay from '../detail/components/ClosedAuctionOverlay';

const AuctionTimerDynamic = ({ endDate }: { endDate: AuctionRow['end_date'] }) => {
  const { days, hours, minutes, seconds } = useTimer({
    endDate,
    onCompleted: () => {
      return <ClosedAuctionOverlay />;
    }
  });
  let status: AuctionTimerStatus = 'ongoing';
  let formattedTime = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;

  if (parseInt(days) > 0) {
    //ANCHOR - 24시간 이상일 경우: '일', '시간', '분'만 표시
    formattedTime = `${days}일 ${hours}시간 ${minutes}분`;
    status = 'ongoing';
  } else {
    //ANCHOR -  24시간 미만일 경우: '시간', '분', '초' 표시
    formattedTime = `${hours}시간 ${minutes}분 ${seconds}초`;
    status = 'urgent';
  }

  return (
    <>
      <AuctionTimer remainTime={formattedTime} status={status}>
        <IoTime />
        <span>남은 시간:</span>
      </AuctionTimer>
    </>
  );
};

export default AuctionTimerDynamic;
