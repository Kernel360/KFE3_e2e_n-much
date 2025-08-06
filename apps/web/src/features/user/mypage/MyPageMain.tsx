import LogoutButton from 'src/features/user/mypage/components/main/LogoutButton';
import MyPageNavigation from 'src/features/user/mypage/components/main/MyPageNavigation';
import MyPageUserProfile from 'src/features/user/mypage/components/main/MyPageUserProfile';
import PageContainer from 'src/shared/ui/PageContainer';

const MyPageMain = () => {
  return (
    <PageContainer>
      <MyPageUserProfile />
      <MyPageNavigation />
      <LogoutButton />
    </PageContainer>
  );
};

export default MyPageMain;
