import Link from 'next/link';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
// import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { RiAuctionFill } from 'react-icons/ri';
import { useActiveRoute } from 'src/entities/layout/hooks/useActiveRoute';
import type { MobileNavigationListProps } from 'src/entities/layout/types';

const COLORS = {
  ACTIVE: 'text-(--color-accent)',
  INACTIVE: 'text-(--color-warm-gray)'
};

const baseClass = 'flex flex-col items-center gap-0.5 py-2 w-full cursor-pointer';
const getTextColor = (isActive: boolean) => (isActive ? COLORS.ACTIVE : COLORS.INACTIVE);

const MobileNavigationList = ({ isSearchOpen, setIsSearchOpen }: MobileNavigationListProps) => {
  const { isHome, isAuctions, isMypage } = useActiveRoute();

  return (
    <nav
      className="border-t-(--color-warm-gray)/30 fixed bottom-0 left-0 right-0 z-40 m-auto h-16 max-w-2xl border-t bg-white"
      role="navigation"
      aria-label="하단 모바일 메뉴"
    >
      <ul className="flex h-full items-center justify-between" role="menubar">
        <li className="flex-1">
          <Link href="/main" className={`${baseClass} ${getTextColor(isHome)}`}>
            <AiFillHome size={20} />
            <span className="mt-1 text-xs">홈</span>
          </Link>
        </li>
        <li className="flex-1" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <div className={`${baseClass} ${getTextColor(isSearchOpen)}`}>
            <AiOutlineSearch size={22} />
            <span className="mt-1 text-xs">검색</span>
          </div>
        </li>
        <li className="flex-1">
          <Link href="/auctions" className={`${baseClass} ${getTextColor(isAuctions)}`}>
            <RiAuctionFill size={22} />
            <span className="mt-1 text-xs">경매현황</span>
          </Link>
        </li>
        {/* <li className="flex-1">
          <Link href="/chat" className={`${baseClass} ${getTextColor(isChat)}`}>
            <HiChatBubbleOvalLeftEllipsis size={22} />
            <span className="mt-1 text-xs">채팅</span>
          </Link>
        </li> */}
        <li className="flex-1">
          <Link href="/mypage" className={`${baseClass} ${getTextColor(isMypage)}`}>
            <FaUser size={20} />
            <span className="mt-1 text-xs">마이페이지</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigationList;
