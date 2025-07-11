import React from 'react';
import ListCard from '../../widgets/ListCard';
import Image from 'next/image';
import AuctionTimer from '../auctions/detail/AuctionTimer';
import { fetchAuctionWithSellerInfo } from 'src/entities/auction/api';
import { AuctionRow } from 'src/shared/supabase/types';
import NotAuctionImage from 'assets/images/auctionDefault.png';

const EpisodesAuctionCard = async ({ auction_id }: { auction_id: AuctionRow['auction_id'] }) => {
  // NOTE - 경매 상품 및 경매 업체 정보
  const auctionInfo = await fetchAuctionWithSellerInfo(auction_id!);
  const { image_urls, address, title, start_time, end_time } = auctionInfo;
  const auctionImage = image_urls && image_urls.length > 0 ? image_urls[0] : NotAuctionImage;

  return (
    <ListCard>
      <div className="flex gap-2">
        <div className="flex flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={auctionImage!} alt="테스트 이미지입니다." width={80} height={80} className="object-cover" />
        </div>

        <div className="flex w-full flex-col justify-between">
          <div>
            <p className="font-medium">{title}</p>
            <div className="flex items-center">
              <address className="max-w-[45%] truncate text-sm text-[--color-warm-gray]">{address}</address>
            </div>
          </div>
          <AuctionTimer startTime={start_time} endTime={end_time} />
        </div>
      </div>
    </ListCard>
  );
};

export default EpisodesAuctionCard;
