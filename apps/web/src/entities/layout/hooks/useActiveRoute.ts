'use client';
import { usePathname } from 'next/navigation';

const useActiveRoute = () => {
  const pathname = usePathname();
  return {
    isHome: pathname === '/main',
    isAuctionWrite: pathname.startsWith('/auctions/write'),
    isChat: pathname.startsWith('/chat'),
    isAuctions: pathname.startsWith('/auctions'),
    isMypage: pathname.startsWith('/mypage')
  };
};

export { useActiveRoute };
