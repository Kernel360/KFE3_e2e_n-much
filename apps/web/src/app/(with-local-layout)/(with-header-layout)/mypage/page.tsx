// 'use client';
// import UserProfileCard from 'src/components/mypage/shared/main/UserProfileCard';
// import MyPageMenuList from 'src/components/mypage/shared/main/MyPageMenuList';
// import MyPageNotification from 'src/components/mypage/shared/main/MyPageNotification';
// import ActivityList from 'src/components/mypage/shared/main/ActivityList';
// import PageContainer from 'src/components/layout/PageContainer';
// import LogoutButton from 'src/components/mypage/shared/LogoutButton';
// import { useGetUserInfo } from 'src/features/user/queries/useUsers';

// const MyPage = () => {
//   const { data: userInfo, isLoading, error } = useGetUserInfo();

//   if (isLoading) return <div>로딩 중...</div>;
//   if (error) return <div>사용자 정보를 찾을 수 없습니다.</div>;
//   if (!userInfo) return <div>사용자 정보가 없습니다.</div>;

//   if (userInfo.role === 'BUYER') {
//     return (
//       <PageContainer>
//         <UserProfileCard role="BUYER" userInfo={userInfo.userInfo} />
//         <MyPageMenuList role="BUYER" />
//         <MyPageNotification role="BUYER" />
//         <ActivityList />
//         <LogoutButton />
//       </PageContainer>
//     );
//   } else {
//     return (
//       <PageContainer>
//         <UserProfileCard role="SELLER" userInfo={userInfo.userInfo} />
//         <MyPageMenuList role="SELLER" />
//         <MyPageNotification role="SELLER" />
//         <ActivityList />
//         <LogoutButton />
//       </PageContainer>
//     );
//   }
// };
// export default MyPage;
