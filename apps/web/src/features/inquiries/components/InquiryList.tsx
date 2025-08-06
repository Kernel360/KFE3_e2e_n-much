import { getServerUser } from 'src/entities/auth/serverAction';
import { getInquiryWithAuctionWithAddressList } from 'src/entities/inquiry/api';
import InquiryListItem from 'src/features/inquiries/components/InquiryListItem';
import type { AuctionSummaryInfoWithAddressType } from 'src/entities/auction/types';
import type { InquiryInfo, InquiryWithAuctionWithAddress } from 'src/entities/inquiry/types';

const InquiryList = async () => {
  const user = await getServerUser();
  let userId = '';
  if (user) {
    userId = user.id;
  }

  let inquiryWithAuctionWithAddressList: InquiryWithAuctionWithAddress[] | null = null;
  try {
    inquiryWithAuctionWithAddressList = await getInquiryWithAuctionWithAddressList(userId);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return (
    <ul>
      {inquiryWithAuctionWithAddressList &&
        (inquiryWithAuctionWithAddressList.length > 0 ? (
          inquiryWithAuctionWithAddressList.map((inquiryWithAuctionWithAddress) => {
            // DB 요청으로 가져온 반환값, inquiries{actions{adrresses}}의 중첩된 객체 펼치기
            const {
              inquiry_id: inquiryId,
              title,
              description,
              auctions: auctionWithAddress
            } = inquiryWithAuctionWithAddress;
            const { addresses, ...rest } = auctionWithAddress;

            const inquiryInfo: InquiryInfo = { inquiryId, title, description };
            const auctionInfo: AuctionSummaryInfoWithAddressType = { ...addresses, ...rest };

            return <InquiryListItem key={inquiryId} inquiryInfo={inquiryInfo} auctionInfo={auctionInfo} />;
          })
        ) : (
          <p className="text-(--color-warm-gray) text-sm">문의 내역이 없습니다.</p>
        ))}
    </ul>
  );
};

export default InquiryList;
