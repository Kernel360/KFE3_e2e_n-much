'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileNavigationList from 'src/features/layout/nav/MobileNavigationList';
import SearchDrawer from 'src/features/search/SearchDrawer';

const MobileNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {isSearchOpen && <SearchDrawer open={isSearchOpen} setOpen={setIsSearchOpen} />}
      <MobileNavigationList isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </>
  );
};

export default MobileNavigation;
