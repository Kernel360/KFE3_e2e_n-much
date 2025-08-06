'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';

const SCROLL_THRESHOLD = 200;
const TOOLTIP_DELAY_TIME = 5000;

const WriteAuctionButton = () => {
  const { push } = useRouter();
  const user = useUserState();

  const [isGoTopVisible, setIsGoTopVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= SCROLL_THRESHOLD && currentScrollY >= lastScrollY) {
        setIsGoTopVisible(true);
      } else {
        setIsGoTopVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, TOOLTIP_DELAY_TIME);
  }, []);

  const handleNavigateToWrite = () => {
    push('/auctions/write');
  };

  if (!user || user.role !== 'seller') {
    return null;
  }

  return (
    <div className="bottom-15 fixed left-0 right-2 z-50">
      <div className="relative m-auto max-w-2xl">
        <div
          className={`absolute right-12 z-[1000] transform transition-all duration-500 ${
            isGoTopVisible
              ? 'bottom-16 translate-x-1 rotate-1 scale-95 opacity-90'
              : 'bottom-[18px] translate-x-0 rotate-0 scale-100 opacity-100'
          }`}
        >
          {isTooltipVisible ? (
            <div className="flex items-center gap-0">
              <div className="bg-(--color-text-base) whitespace-nowrap rounded-md px-3 py-2 text-sm text-white">
                경매를 등록해보세요!
              </div>
              <div className="border-l-(--color-text-base) -ml-1 h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-t-transparent"></div>
            </div>
          ) : null}
        </div>

        <button
          onClick={handleNavigateToWrite}
          aria-label="경매 작성하기 페이지로 이동"
          className={`absolute right-2 z-[999] overflow-hidden transition-all duration-300 hover:scale-110 hover:opacity-80 ${
            isGoTopVisible ? 'bottom-16' : 'bottom-5'
          }`}
        >
          <FiPlus className="order-(--color-text-base)/30 bg-(--color-text-base) size-8 rounded-full border p-1 text-white transition-transform hover:rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default WriteAuctionButton;
