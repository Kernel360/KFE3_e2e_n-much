import Image from 'next/image';
import NotAuctionImage from 'src/assets/images/noAuctionImage.png';
import AuctionTimerStatic from 'src/features/auction/timer/AuctionTimerStatic';
import PageDescription from 'src/shared/ui/PageDescription';
import PageTitle from 'src/shared/ui/PageTitle';
import BaseCard from 'src/widgets/BaseCard';
import type { AuctionSummaryInfoWithAddressType } from 'src/entities/auction/types';

const AuctionSummaryCard = async ({ auctionInfo }: { auctionInfo: AuctionSummaryInfoWithAddressType }) => {
  const imageUrls = auctionInfo.image_urls;
  const auctionTitle = auctionInfo.title;
  const endDate = auctionInfo.end_date;
  const auctionUser = auctionInfo;

  const auctionImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : NotAuctionImage;

  return (
    <BaseCard>
      <div className="flex gap-2">
        <div className="flex flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={auctionImage!}
            alt="테스트 이미지입니다."
            width={110}
            height={110}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex w-full flex-col justify-between">
          <div>
            <PageTitle order="left" size="md">
              {auctionTitle}
            </PageTitle>
            <PageDescription variant="ghost">{auctionUser.business_name}</PageDescription>
            <div className="mb-4 flex gap-2">
              <PageDescription variant="ghost">{auctionUser.road_address}</PageDescription>
              <PageDescription variant="ghost">{auctionUser.detail_address} </PageDescription>
            </div>
          </div>
          <AuctionTimerStatic endDate={endDate} />
        </div>
      </div>
    </BaseCard>
  );
};

export default AuctionSummaryCard;
