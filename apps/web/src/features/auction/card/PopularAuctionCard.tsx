import Image from 'next/image';
import Link from 'next/link';
import NotAuctionImage from 'src/assets/images/noAuctionImage.png';
import AuctionMetaInfo from 'src/features/auction/shared/AuctionMetaInfo';
import type { SortedAuctionItemType } from 'src/entities/auction/types';

const PopularAuctionCard = ({ auction, from }: { auction: SortedAuctionItemType; from?: string }) => {
  const isImage = auction.image_urls && auction.image_urls.length > 0;

  const auctionImage = isImage ? auction.image_urls![0] : NotAuctionImage;
  const favoritesCount = auction.favorites?.length || 0;
  const episodesCount = auction.episodes?.length || 0;

  const getHref = () => {
    const baseUrl = `/auctions/${auction.auction_id}`;
    if (!from) return baseUrl;
    return `${baseUrl}?from=${from}`;
  };

  return (
    <li className="transition-transform hover:scale-[1.02]">
      <Link href={getHref()}>
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
          <Image
            src={auctionImage!}
            alt={auction.title}
            fill
            sizes="(min-width: 768px) 390px, 100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-3 text-white">
            <h3 className="line-clamp-2 text-sm font-medium">{auction.title}</h3>
            <AuctionMetaInfo favoritesCount={favoritesCount} episodesCount={episodesCount} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PopularAuctionCard;
