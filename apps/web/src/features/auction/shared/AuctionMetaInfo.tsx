import { FaBookOpen, FaHeart } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type AuctionMetaInfoType = {
  favoritesCount: number;
  episodesCount: number | string;
  className?: string;
};

const AuctionMetaInfo = ({ favoritesCount, episodesCount, className }: AuctionMetaInfoType) => {
  return (
    <div className={twMerge(`flex gap-3 text-sm`, className)}>
      <p className="flex items-center gap-1">
        <FaHeart className="text-(--color-red) mr-1" />
        <span>{favoritesCount}</span>
      </p>
      <p className="flex items-center gap-1">
        <FaBookOpen className="text-(--color-primary)" />
        <span>{episodesCount}</span>
      </p>
    </div>
  );
};

export default AuctionMetaInfo;
