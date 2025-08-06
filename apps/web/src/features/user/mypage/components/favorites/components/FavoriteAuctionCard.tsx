'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import noAuctionImage from 'src/assets/images/noAuctionImage.png';
import AuctionMetaInfo from 'src/features/auction/shared/AuctionMetaInfo';
import { formatRemainingTime } from 'src/shared/utils/formatRemainingTime';
import type { AuctionCardProps } from 'src/entities/auction/types';

const FavoriteAuctionCard = ({
  auctionId,
  imageSrc,
  title,
  endDate,
  favoriteCount,
  episodeCount,
  currentTab
}: AuctionCardProps) => {
  setDefaultOptions({ locale: ko });
  const { status, remainTime } = formatRemainingTime(endDate);

  const getHref = () => {
    const baseUrl = `/auctions/${auctionId}`;
    if (!currentTab) return baseUrl;

    if (currentTab === 'favorite' || currentTab === 'like') {
      return `${baseUrl}?from=mypage/favorites&tab=${currentTab}`;
    }
    return baseUrl;
  };

  return (
    <li className="rounded-button hover:scale-98 active:scale-96 overflow-hidden rounded-xl bg-white shadow-sm transition-transform">
      <Link href={getHref()}>
        <div className="relative">
          <div className="relative h-40 w-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                fill
                alt={`${title} 이미지`}
                className="object-cover"
                sizes="(min-width: 768px) 400px, 100vw"
              />
            ) : (
              <Image src={noAuctionImage} fill={true} alt={`${title} 이미지`} className="object-fill object-top" />
            )}
          </div>
          <Badge
            className={`absolute bottom-2 right-2 ${
              status === 'urgent' ? 'bg-(--color-red)' : 'bg-(--color-accent)'
            } px-2 py-1 font-normal text-white`}
          >
            {remainTime}
          </Badge>
        </div>
        <div className="p-2">
          <h3 className="text-(--color-text-base) mb-1.5 overflow-hidden text-ellipsis text-sm font-medium">{title}</h3>
          <AuctionMetaInfo
            favoritesCount={favoriteCount}
            episodesCount={`${episodeCount}개의 스토리`}
            className="justify-between"
          />
        </div>
      </Link>
    </li>
  );
};
export default FavoriteAuctionCard;
