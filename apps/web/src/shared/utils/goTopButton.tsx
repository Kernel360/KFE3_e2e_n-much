'use client';
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const SCROLL_THRESHOLD = 200;
const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollY = window.scrollY;

      // 스크롤이 200 이상이고, 아래로 스크롤 중이거나 멈춰있을 때만 보이기
      if (currentScrollY >= SCROLL_THRESHOLD && currentScrollY >= lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [lastScrollY]);

  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="bottom-15 fixed left-0 right-2 z-50">
      <div className="relative m-auto max-w-2xl">
        <button
          onClick={handleClickToTop}
          aria-label="최상단으로 이동"
          className="absolute bottom-5 right-2 z-[999] overflow-hidden transition-opacity hover:opacity-80"
        >
          <IoIosArrowUp className="border-(--color-text-base)/30 text-(--color-text-base) size-8 rounded-full border bg-white p-1" />
        </button>
      </div>
    </div>
  );
};
export default GoTopButton;
