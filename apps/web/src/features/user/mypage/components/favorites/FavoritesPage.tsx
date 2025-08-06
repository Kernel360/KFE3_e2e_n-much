import FavoritesTabContainer from 'src/features/user/mypage/components/favorites/components/FavoritesTabContainer';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const FavoritesPage = () => {
  return (
    <>
      <DetailPageHeader fallbackUrl="/mypage">찜 목록</DetailPageHeader>
      <PageContainer>
        <FavoritesTabContainer />
      </PageContainer>
    </>
  );
};

export default FavoritesPage;
