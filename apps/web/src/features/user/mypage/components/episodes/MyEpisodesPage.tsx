import MyEpisodesTabContainer from 'src/features/user/mypage/components/episodes/components/MyEpisodesTabContainer';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const MyEpisodesPage = () => {
  return (
    <>
      <DetailPageHeader fallbackUrl="/mypage">내가 쓴 스토리</DetailPageHeader>
      <PageContainer>
        <MyEpisodesTabContainer />
      </PageContainer>
    </>
  );
};

export default MyEpisodesPage;
