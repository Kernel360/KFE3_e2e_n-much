import InquiryList from 'src/features/inquiries/components/InquiryList';
import AuctionErrorBoundary from 'src/shared/ui/AuctionErrorBoundary';
import EmptyState from 'src/shared/ui/EmptyState';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const InquiriesPage = () => {
  return (
    <>
      <DetailPageHeader>문의 내역</DetailPageHeader>
      <PageContainer>
        <AuctionErrorBoundary
          fallback={
            <EmptyState title="문의 내역을 불러오는 중 문제가 발생했어요." description="잠시 후 다시 시도해주세요!" />
          }
        >
          <InquiryList />
        </AuctionErrorBoundary>
      </PageContainer>
    </>
  );
};

export default InquiriesPage;
