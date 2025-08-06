import { Card } from '@repo/ui/components/ui/card';
import { getAuctionInfoWithAddress, getSellerAuctionCount } from 'src/entities/auction/api';
import { type AuctionRow } from 'src/shared/supabase/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import ClientContainer from 'src/shared/ui/ClientContainer';

const SellerInfoSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId);
  const { totalAuctions, activeAuctions } = await getSellerAuctionCount(auctionInfo.user_id);

  return (
    <Card className="mb-4 p-5">
      <div className="mb-4 flex justify-between">
        <h3 className="font-medium">판매자 정보</h3>
      </div>

      <div className="flex items-center gap-2">
        <ClientContainer>
          <BaseAvatar src={auctionInfo.company_image!} alt={auctionInfo.business_name!} size="sm" />
        </ClientContainer>

        <div>
          <h3>{auctionInfo.business_name}</h3>
          <div className="text-(--color-warm-gray) text-sm">
            <span>{auctionInfo.road_address}</span>&nbsp;
            <span>{auctionInfo.detail_address}</span>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3"></div>
      <div className="text-(--color-warm-gray) flex text-sm">
        <div className="flex-1">
          <p>총 경매</p>
          <p className="text-(--color-text-base) font-medium">{totalAuctions}개</p>
        </div>
        <div className="flex-1">
          <p>진행중인 경매</p>
          <p className="text-(--color-text-base) font-medium">{activeAuctions}개</p>
        </div>
      </div>
    </Card>
  );
};

export default SellerInfoSection;
