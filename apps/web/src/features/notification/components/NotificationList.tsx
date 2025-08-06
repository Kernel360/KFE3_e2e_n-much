import NotificationListItem from 'src/features/notification/components/NotificationListItem';
import type { NotificationListType } from 'src/entities/notification/type';

//FIXME - 타입 합쳐주세요 하위 컴포넌트 ListItem이랑 겹침
interface NotificationListProps {
  type?: NotificationListType;
}

//NOTE - Header 알림 리스트는 3개만 보이도록 설정, 알림 페이지로 이동하면 리스트 10개 보이도록 설정

const NotificationList = ({ type = 'popover' }: NotificationListProps) => {
  return (
    <ul className="mb-0">
      <NotificationListItem type={type} />
    </ul>
  );
};

export default NotificationList;
