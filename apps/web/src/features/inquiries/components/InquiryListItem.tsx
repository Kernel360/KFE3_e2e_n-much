import Link from 'next/link';
import AuctionSummaryCard from 'src/features/episode/card/AuctionSummaryCard';
import DescriptionWithMoreButton from 'src/features/inquiries/components/DescriptionWithMoreButton';
import EditDeleteButton from 'src/features/inquiries/components/EditDeleteButton';
import BaseCard from 'src/widgets/BaseCard';
import type { AuctionSummaryInfoWithAddressType } from 'src/entities/auction/types';
import type { InquiryInfo } from 'src/entities/inquiry/types';

interface InquiryListItemProps {
  inquiryInfo: InquiryInfo;
  auctionInfo: AuctionSummaryInfoWithAddressType;
}

const InquiryListItem = ({ inquiryInfo, auctionInfo }: InquiryListItemProps) => {
  const { inquiryId, title, description } = inquiryInfo;
  const { auction_id: auctionId } = auctionInfo;

  return (
    <li>
      <BaseCard variant="default" className="flex w-full items-center gap-4 sm:!items-start">
        <div className="w-full">
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <div className="flex items-center gap-2">
              <h3 className="text-(--color-text-base)">{title}</h3>
            </div>
            <div className="mb-2 ml-auto flex items-center gap-2">
              <EditDeleteButton auctionId={auctionId} inquiryId={inquiryId} />
            </div>
          </div>
          <div className="text-sm">
            <DescriptionWithMoreButton description={description} />
          </div>
          <div className="bg-(--color-secondary) mt-2 rounded-lg p-3">
            {/** 업체 정보 클릭 시 auction-detail 페이지로 이동 */}
            {/* <AuctionSummaryCard auctionInfo={auctionInfo} /> */}
            <Link href={`/auctions/${auctionId}`}>
              <AuctionSummaryCard auctionInfo={auctionInfo} />
            </Link>
          </div>
        </div>
      </BaseCard>
    </li>
  );
};

export default InquiryListItem;
