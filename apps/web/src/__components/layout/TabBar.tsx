'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchBar from '../../features/search/SearchBar';
import TabNavigation from './TabNavigation';
import { useUserStore } from 'src/entities/auth/stores/UserStore';

export default function TabBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { userRole } = useUserStore();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {}, [userRole]);

  return (
    <>
      {isSearchOpen && <SearchBar />}
      <TabNavigation isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} isSeller={userRole === 'SELLER'} />
    </>
  );
}
