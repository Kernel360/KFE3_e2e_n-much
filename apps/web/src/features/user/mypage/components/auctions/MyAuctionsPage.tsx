import MyAuctionsTabContainer from 'src/features/user/mypage/components/auctions/components/MyAuctionsTabContainer';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const MyAuctionsPage = () => {
  return (
    <>
      <DetailPageHeader fallbackUrl="/mypage">내 경매 현황</DetailPageHeader>
      <PageContainer>
        <MyAuctionsTabContainer />
      </PageContainer>
    </>
  );
};

export default MyAuctionsPage;
