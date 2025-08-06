import Image from 'next/image';
import Link from 'next/link';
import Logo from 'src/assets/images/logo.svg';
import LogoDark from 'src/assets/images/logo_dark.svg';
import RoleSwitch from 'src/features/layout/header/RoleSwitch';
import NotificationManager from 'src/features/notification/components/NotificationManager';

const Header = () => {
  return (
    <header className="border-b-(--color-warm-gray)/30 h-16 w-full border-b px-5">
      <div className="flex h-full items-center justify-between">
        <Link href="/main">
          <h1 className="text-lg font-bold">
            <Image src={Logo} alt="logo" className="block size-12 dark:hidden" />
            <Image src={LogoDark} alt="logo" className="hidden size-12 dark:block" />
          </h1>
        </Link>
        <div className="flex items-center">
          <RoleSwitch className="mr-5" />
          <NotificationManager />
        </div>
      </div>
    </header>
  );
};

export default Header;
