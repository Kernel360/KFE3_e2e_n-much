import { Button } from '@repo/ui/components/ui/button';
import NotificationList from 'src/features/notification/components/NotificationList';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const NotificationPage = () => {
  return (
    <>
      <DetailPageHeader>알림</DetailPageHeader>
      <PageContainer className="pb-6 pt-4">
        <NotificationList />
        <Button variant="base" className="w-full py-5">
          더 많은 알림 불러오기
        </Button>
      </PageContainer>
    </>
  );
};

export default NotificationPage;
