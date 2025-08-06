import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import BaseCard from 'src/widgets/BaseCard';

type MyPageMenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  role: string;
};

type MyPageNavigationListProps = {
  el: Omit<MyPageMenuItem, 'role'>;
};

const MyPageNavigationList = ({ el }: MyPageNavigationListProps) => {
  const { href, label, icon } = el;

  //NOTE - 외부링크
  const isExternalLink = href.startsWith('http');

  return (
    <li>
      <div className="flex items-center">
        <BaseCard
          as={isExternalLink ? 'a' : Link}
          href={href}
          className="hover:bg-(--color-secondary) flex w-full items-center justify-between gap-3 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="bg-(--color-secondary) flex size-10 items-center justify-center rounded-full">{icon}</span>
            <h3 className="font-medium">{label}</h3>
          </div>
          <FaChevronRight className="text-(--color-warm-gray)" />
        </BaseCard>
      </div>
    </li>
  );
};

export default MyPageNavigationList;
