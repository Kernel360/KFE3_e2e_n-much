'use client';
import { FaGavel, FaCoins, FaHeart } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { LuHeartHandshake } from 'react-icons/lu';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { ICON_NAMES, MYPAGE_MENU_LIST } from 'src/entities/user/mypage/main/constants';
import MyPageNavigationList from 'src/features/user/mypage/components/main/MyPageNavigationList';
import MyPageNavigationSkeleton from 'src/features/user/mypage/components/main/skeleton/MyPageNavigationSkeleton';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case ICON_NAMES.DOCUMENT:
      return <HiDocumentText className="text-(--color-accent) size-5" />;
    case ICON_NAMES.GAVEL:
      return <FaGavel className="text-(--color-accent) size-4" />;
    case ICON_NAMES.COINS:
      return <FaCoins className="text-(--color-accent) size-4" />;
    case ICON_NAMES.HEART:
      return <FaHeart className="text-(--color-accent) size-4" />;
    case ICON_NAMES.CHAT:
      return <HiChatBubbleLeftRight className="text-(--color-accent) size-5" />;
    case ICON_NAMES.HANDSHAKE:
      return <LuHeartHandshake className="text-(--color-accent) size-5" />;
    default:
      return null;
  }
};

const MyPageNavigation = () => {
  const user = useUserState();
  if (!user || !user.role || !['buyer', 'seller'].includes(user.role)) {
    return <MyPageNavigationSkeleton />;
  }

  const role = user.role || 'buyer';
  const filteredMenus = MYPAGE_MENU_LIST.filter((menu) => menu.role === role || menu.role === 'common');

  return (
    <nav className="mt-6">
      <ul className="space-y-3">
        {filteredMenus.map((el) => (
          <MyPageNavigationList key={el.label} el={{ ...el, icon: getIcon(el.icon) }} />
        ))}
      </ul>
    </nav>
  );
};

export default MyPageNavigation;
