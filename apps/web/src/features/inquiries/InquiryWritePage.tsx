import { notFound } from 'next/navigation';
import { getAuctionSummaryInfoWithAddress } from 'src/entities/auction/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import { getInquiryInfo } from 'src/entities/inquiry/api';
import AuctionSummaryCard from 'src/features/episode/card/AuctionSummaryCard';
import InquiryForm from 'src/features/inquiries/components/InquiryForm';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import type { InquiryRow } from 'src/shared/supabase/types';

const InquiryWritePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auctionId, inquiryId] = (await params).id;
  const auctionInfo = await getAuctionSummaryInfoWithAddress(auctionId!);

  // true: 수정, false: 등록
  let initialInquiryInfo: InquiryRow | null = null;
  if (inquiryId) {
    initialInquiryInfo = await getInquiryInfo(inquiryId);
  }

  const user = await getServerUser();
  if (!user) {
    return notFound();
  }

  return (
    <>
      <DetailPageHeader>{initialInquiryInfo ? '문의 수정하기' : '문의 등록하기'}</DetailPageHeader>
      <PageContainer>
        <AuctionSummaryCard auctionInfo={auctionInfo} />
        <InquiryForm auctionId={auctionId!} initialInquiryInfo={initialInquiryInfo} userId={user.id} />
      </PageContainer>
    </>
  );
};

export default InquiryWritePage;
