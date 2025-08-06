import PointHistory from 'src/features/user/mypage/components/points/components/PointHistory';
import PointOverview from 'src/features/user/mypage/components/points/components/PointOverview';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const MyPointsPage = () => {
  return (
    <>
      <DetailPageHeader>포인트 사용 내역</DetailPageHeader>
      <PageContainer>
        <section>
          <PointOverview />
          <PointHistory />
        </section>
      </PageContainer>
    </>
  );
};

export default MyPointsPage;
